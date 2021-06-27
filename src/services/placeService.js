import axios from 'axios'
//import places from "../data/places.json";
export class PlaceService {
    async getAllPlaces(query) {
        try {
            const places = await axios.get("http://localhost:3000/api/places/" + query)
            return places.data;
        } catch (err) { return err.message }
    }
    async getPlaceById(id) {
        try {
            const place = await axios.get("http://localhost:3000/api/places/" + id)
            return place.data || null;
        } catch (err) { return err.message }
    }
    async updatePlaceById(id, params) {
        try {
            // axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
            const updatedPlace = axios.patch("http://localhost:3000/api/places/" + id, params).then(result => result.data)
            return updatedPlace
        } catch (err) { console.log('cors matter'); return err.message }
    }
    async createPlace(params) {
        try {
            //axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
            const createdPlace = axios.post("http://localhost:3000/api/places/", params).then(result => result.data)
            return createdPlace
        } catch (err) { return err.message }
    }
    async getCommentsForPlace(id) {
        try {
            const commentsForPlace = await axios.get("http://localhost:3000/api/comments/" + id)
            return commentsForPlace.data
        } catch (err) { return err.message }
    }
    async createCommentforPlace(id, params) {
        try {
            //axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
            const addedComment = axios.post("http://localhost:3000/api/comments/" + id, params)
            return addedComment
        } catch (err) { return err.message }
    }
    async deleteComment(id) {
        try {
            //axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
            const deletedComment = axios.delete("http://localhost:3000/api/comments/" + id)
            return deletedComment
        } catch (err) { return err.message }
    }
    async getPhotosForPlace(id) {
        try {
            const photosForPlace = await axios.get("http://localhost:3000/api/photos/" + id).then(result => result.data)
            return photosForPlace
        } catch (err) { return err.message }
    }
    async addPhotoForPlace(id, params) {
        try {
            //axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
            const addedPhoto = axios.post("http://localhost:3000/api/photos/" + id, params).then(result => result.data)
            return addedPhoto
        } catch (err) { return err.message }
    }
    async deletePhoto(id) {
        try {
            //axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
            const deletedPhoto = axios.delete('http://localhost:3000/api/photos/' + id).then(result => result.data)
            return deletedPhoto
        } catch (err) { return err.message }
    }
}

const placeService = new PlaceService();

export default placeService;