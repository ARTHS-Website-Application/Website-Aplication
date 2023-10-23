export const formatPrice = (price: number | undefined) => {
    if (price) {
        const formattedPrice = (price / 1000).toLocaleString();

        return `${formattedPrice}.000`;
    }

}