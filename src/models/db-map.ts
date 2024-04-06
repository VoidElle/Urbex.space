export default class DbMap {

    id: string;
    imageUrl: string;
    name: string;
    urlValue: string;

    constructor(id: string, imageUrl: string, name: string, urlValue: string) {
        this.id = id;
        this.imageUrl = imageUrl;
        this.name = name;
        this.urlValue = urlValue;
    }

}