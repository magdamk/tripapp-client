import axios from 'axios'
//import places from "../data/places.json";
export class PlaceService {
    async getAllPlaces(query) {
        try {
            const places = await axios.get("/api/places/" + query)
            return places.data;
        } catch (err) { return err.message }
    }
    async getPlaceById(id) {
        try {
            const place = await axios.get("/api/places/" + id)
            return place.data || null;
        } catch (err) { return err.message }
    }
    async updatePlaceById(id, params) {
        try {
            const updatedPlace = axios.patch("/api/places/" + id, params).then(result => result.data)
            return updatedPlace
        } catch (err) { return err.message }
    }
    async createPlace(params) {
        try {
            const createdPlace = axios.post("/api/places/", params).then(result => result.data)
            return createdPlace
        } catch (err) { return err.message }
    }
    async getCommentsForPlace(id) {
        try {
            const commentsForPlace = await axios.get("/api/comments/" + id)
            return commentsForPlace.data
        } catch (err) { return err.message }
    }
    async createCommentforPlace(id, params) {
        try {
            const addedComment = axios.post("/api/comments/" + id, params)
            return addedComment
        } catch (err) { return err.message }
    }
    async deleteComment(id) {
        try {
            const deletedComment = axios.delete("/api/comments/" + id)
            return deletedComment
        } catch (err) { return err.message }
    }
    async getPhotosForPlace(id) {
        try {
            const photosForPlace = await axios.get("/api/photos/" + id).then(result => result.data)
            return photosForPlace
        } catch (err) { return err.message }
    }
    async addPhotoForPlace(id, params) {
        try {
            const addedPhoto = axios.post("/api/photos/" + id, params).then(result => result.data)
            return addedPhoto
        } catch (err) { return err.message }
    }
    async deletePhoto(id) {
        try {
            const deletedPhoto = axios.delete('/api/photos/' + id).then(result => result.data)
            return deletedPhoto
        } catch (err) { return err.message }
    }
}

const placeService = new PlaceService();

export default placeService;