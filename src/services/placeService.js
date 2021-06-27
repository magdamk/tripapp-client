import axios from 'axios'
export class PlaceService {
    async getAllPlaces(query) {
        try {
            const places = await axios.get("https://tripapp-mm.herokuapp.com/api/places/" + query)
            return places.data;
        } catch (err) { return err.message }
    }
    async getPlaceById(id) {
        try {
            const place = await axios.get("https://tripapp-mm.herokuapp.com/api/places/" + id)
            return place.data || null;
        } catch (err) { return err.message }
    }
    async updatePlaceById(id, params) {
        try {
            const updatedPlace = axios.patch("https://tripapp-mm.herokuapp.com/api/places/" + id, params).then(result => result.data)
            return updatedPlace
        } catch (err) { console.log('cors matter'); return err.message }
    }
    async createPlace(params) {
        try {
            const createdPlace = axios.post("https://tripapp-mm.herokuapp.com/api/places/", params).then(result => result.data)
            return createdPlace
        } catch (err) { return err.message }
    }
    async getCommentsForPlace(id) {
        try {
            const commentsForPlace = await axios.get("https://tripapp-mm.herokuapp.com/api/comments/" + id)
            return commentsForPlace.data
        } catch (err) { return err.message }
    }
    async createCommentforPlace(id, params) {
        try {
            const addedComment = axios.post("https://tripapp-mm.herokuapp.com/api/comments/" + id, params)
            return addedComment
        } catch (err) { return err.message }
    }
    async deleteComment(id) {
        try {
            const deletedComment = axios.delete("https://tripapp-mm.herokuapp.com/api/comments/" + id)
            return deletedComment
        } catch (err) { return err.message }
    }
    async getPhotosForPlace(id) {
        try {
            const photosForPlace = await axios.get("https://tripapp-mm.herokuapp.com/api/photos/" + id).then(result => result.data)
            return photosForPlace
        } catch (err) { return err.message }
    }
    async addPhotoForPlace(id, params) {
        try {
            const addedPhoto = axios.post("https://tripapp-mm.herokuapp.com/api/photos/" + id, params).then(result => result.data)
            return addedPhoto
        } catch (err) { return err.message }
    }
    async deletePhoto(id) {
        try {
            const deletedPhoto = axios.delete('https://tripapp-mm.herokuapp.com/api/photos/' + id).then(result => result.data)
            return deletedPhoto
        } catch (err) { return err.message }
    }
}

const placeService = new PlaceService();

export default placeService;