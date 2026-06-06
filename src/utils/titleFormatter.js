const formattedTitle = (title) => {
    return title.split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

module.exports = {
    formattedTitle
}