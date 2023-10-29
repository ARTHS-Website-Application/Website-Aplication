export const formatPrice = (price: number | undefined) => {
    if (price) {
        if (price > 1000) {
            const formattedPrice = (price / 1000).toLocaleString();

            return `${formattedPrice}.000`;
        }else{
            return price
        }

    }

}