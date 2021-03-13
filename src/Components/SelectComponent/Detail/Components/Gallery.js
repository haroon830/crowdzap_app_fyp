import React, {Component} from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css"

class Gallery extends Component{
    images = [
        {
            original: this.props.data.galleryImages[0],
            thumbnail: 'https://picsum.photos/id/1018/250/150/',
        },
        {
            original: this.props.data.galleryImages[0],
            thumbnail: 'https://picsum.photos/id/1015/250/150/',
        },
        {
            original: this.props.data.galleryImages[0],
            thumbnail: 'https://picsum.photos/id/1019/250/150/',
        },
    ];
    render(){
        return(
            <div
                role="tabpanel"
                hidden={this.props.value !== 2}
                id={'simple-tabpanel-0'}
                aria-labelledby={`simple-tab-0`}
                style={{paddingTop:"1%"}}
            >
                <ImageGallery items={this.images} autoPlay={true} showPlayButton={false} />
            </div>
        )
    }
}
export default Gallery