import { Prisma, PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { ApiError } from "../middleware/errorHandler";

const prisma = new PrismaClient();

function parseCarId(idParam: string): number {
  const id = Number(idParam);
  if (!Number.isInteger(id) || id <= 0) {
    throw new ApiError(400, "Invalid car id");
  }
  return id;
}

function validateCarBody(body: any, isPartial = false) {
  const requiredFields = [
    "registrationNumber",
    "brand",
    "model",
    "year",
    "color",
  ];

  if (!isPartial) {
    for (const field of requiredFields) {
      if (
        body[field] === undefined ||
        body[field] === null ||
        body[field] === ""
      ) {
        throw new ApiError(400, `Field "${field}" is required`);
      }
    }
  }

  if (body.year !== undefined) {
    const year = Number(body.year);
    if (!Number.isInteger(year) || year < 1900 || year > 2100) {
      throw new ApiError(400, 'Field "year" must be a valid year');
    }
  }

  for (const field of [
    "registrationNumber",
    "brand",
    "model",
    "color",
    "notes",
  ]) {
    if (
      body[field] !== undefined &&
      body[field] !== null &&
      typeof body[field] !== "string"
    ) {
      throw new ApiError(400, `Field "${field}" must be a string`);
    }
  }
}

export async function getAllCars(
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const cars = await prisma.car.findMany({ orderBy: { createdAt: "desc" } });
    res.status(200).json(cars);
  } catch (err) {
    next(err);
  }
}

export async function getCarById(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const id = parseCarId(req.params.id);
    const car = await prisma.car.findUnique({ where: { id } });
    if (!car) {
      throw new ApiError(404, "Car not found");
    }
    res.status(200).json(car);
  } catch (err) {
    next(err);
  }
}

export async function createCar(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    validateCarBody(req.body);
    const { registrationNumber, brand, model, year, color, notes } = req.body;

    const car = await prisma.car.create({
      data: {
        registrationNumber,
        brand,
        model,
        year: Number(year),
        color,
        notes: notes ?? null,
      },
    });

    res.status(201).json(car);
  } catch (err) {
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2002"
    ) {
      return next(
        new ApiError(400, "A car with this registration number already exists"),
      );
    }
    next(err);
  }
}

export async function updateCar(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const id = parseCarId(req.params.id);
    validateCarBody(req.body, true);

    const existing = await prisma.car.findUnique({ where: { id } });
    if (!existing) {
      throw new ApiError(404, "Car not found");
    }

    const { registrationNumber, brand, model, year, color, notes } = req.body;

    const car = await prisma.car.update({
      where: { id },
      data: {
        ...(registrationNumber !== undefined && { registrationNumber }),
        ...(brand !== undefined && { brand }),
        ...(model !== undefined && { model }),
        ...(year !== undefined && { year: Number(year) }),
        ...(color !== undefined && { color }),
        ...(notes !== undefined && { notes }),
      },
    });

    res.status(200).json(car);
  } catch (err) {
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2002"
    ) {
      return next(
        new ApiError(400, "A car with this registration number already exists"),
      );
    }
    next(err);
  }
}

export async function deleteCar(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const id = parseCarId(req.params.id);

    const existing = await prisma.car.findUnique({ where: { id } });
    if (!existing) {
      throw new ApiError(404, "Car not found");
    }

    await prisma.car.delete({ where: { id } });
    res.status(200).json({ message: "Car deleted successfully" });
  } catch (err) {
    next(err);
  }
}
