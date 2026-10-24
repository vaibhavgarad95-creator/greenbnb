
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionUserId } from "@/lib/auth";

export async function GET() {
  try {
    const userId = await getSessionUserId();

    if (!userId) {
      return NextResponse.json(
        { error: "Please log in to view your bookings." },
        { status: 401 }
      );
    }

    const bookings = await prisma.booking.findMany({
      where: {
        guestId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        startDate: true,
        endDate: true,
        guests: true,
        totalPrice: true,
        status: true,
        createdAt: true,
        listing: {
          select: {
            title: true,
            city: true,
            country: true,
          },
        },
      },
    });

    return NextResponse.json({
      bookings: bookings.map((booking) => ({
        ...booking,
        totalPrice: booking.totalPrice.toString(),
      })),
    });
  } catch (error) {
    console.error("Failed to fetch bookings:", error);

    return NextResponse.json(
      { error: "Unable to load bookings right now." },
      { status: 500 }
    );
  }
}
