import React, {Component} from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css"

class Gallery extends Component{
    getImages(){
        let images = []
        this.props.data.galleryImages.forEach(element => {
            let image ={
                original: element,
                thumbnail: element,
            }
            images.push(image)
        });
        return images
    }

    render(){
        return(
            <div
                role="tabpanel"
                hidden={this.props.value !== 2}
                id={'simple-tabpanel-0'}
                aria-labelledby={`simple-tab-0`}
                style={{paddingTop:"1%"}}
            >
                <ImageGallery items={this.getImages()} autoPlay={true} showPlayButton={false} />
            </div>
        )
    }
}
export default Gallery