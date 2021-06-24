import axios from 'axios'
//import places from "../data/places.json";
export class PlaceService {
    async getAllPlaces(query) {
        const places = await axios.get("/api/places/" + query)
        return places.data;
    }
    async getPlaceById(id) {
        const place = await axios.get("/api/places/" + id)
        return place.data || null;
    }
    async updatePlaceById(id, params) {
        const updatedPlace = axios.patch("/api/places/" + id, params).then(result => result.data)
        return updatedPlace
    }
    async createPlace(params) {
        const createdPlace = axios.post("/api/places/", params).then(result => result.data)
        return createdPlace
    }
    async getCommentsForPlace(id) {
        const commentsForPlace = await axios.get("/api/comments/" + id)
        return commentsForPlace.data
    }
    async createCommentforPlace(id, params) {
        const addedComment = axios.post("/api/comments/" + id, params)
        return addedComment
    }
    async deleteComment(id) {
        const deletedComment = axios.delete("/api/comments/" + id)
        return deletedComment
    }
    async getPhotosForPlace(id) {
        const photosForPlace = await axios.get("/api/photos/" + id)
        return photosForPlace.data
    }
    async addPhotoForPlace(id, params) {
        const addedPhoto = axios.post("/api/photos/" + id, params).then(result => result.data)
        return addedPhoto
    }
    async deletePhoto(id) {
        const deletedPhoto = axios.delete('/api/photos/' + id).then(result => result.data)
        return deletedPhoto
    }
}

const placeService = new PlaceService();

export default placeService;