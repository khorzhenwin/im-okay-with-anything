export interface CardInterface {
    id: string;
    restaurantName: string;
    location?: string;
    image?: string;
    cuisine?: string;
}

export type SwipeDirection = "left" | "right" | "up" | "down";
