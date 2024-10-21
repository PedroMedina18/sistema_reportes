const pattern={
    email:/^[a-zA-Z0-9._%+\-$!]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    textWithNumber:/^[a-zA-ZÁ-ÿ0-9.,\s]+$/,
    names:/^[a-zA-ZÁ-ÿ]+$/,
    password:/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[.,_&%$#!+*-])[A-Za-z\d.,_&%$#!+*-]{8,20}$/,
    userName:/^[A-Za-z\d]{5,25}$/,
}

export default pattern