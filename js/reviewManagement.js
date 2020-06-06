const server = require('../server.js');
const db = server.getDB();
var reviewManagement = {
    addReview: (review) => {
        return new Promise((resolve, reject) => {
            console.log(review);
            db.addReview(review.movieid, review.userid, review.rank, review.review)
                .then(
                    (data) => {
                        resolve(data);
                    }
                )
                .catch(
                    (err) => {
                        reject(err);
                    }
                );
        });
    },
    getReviewsByUserId: (id) => {
        console.log(id);
        return new Promise((resolve, reject) => {
            db.getReviewsByUserId(id)
                .then(
                    (data) => {
                        resolve(data);
                    }
                )
                .catch(
                    (err) => {
                        reject(err);
                    }
                );
        })

    }

}

module.exports = reviewManagement;
