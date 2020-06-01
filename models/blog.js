
module.exports = blogModel = (userId, username, title, subtitle, content, date, photoData, photoType, category) => {
    return {
        userId: userId,
        userName: username,
        title: title,
        subtitle: subtitle,
        content: content,
        date: date,
        photo: {
            data: photoData,
            contentType: photoType
        },
        category: category

    }
}








