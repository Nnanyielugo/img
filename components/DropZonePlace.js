import React from 'react';
import _ from 'lodash';

var style = {
  background: 'red'
};

var timer = '';

class DropZonePlace extends React.Component{

	constructor(props){
		super(props);
		this.state = {
      image1PreviewUrl: '',
      image2PreviewUrl: '',
      status: 'idle',
      statusMsg1: (<p>Click or drop files here to upload...</p>),
      statusMsg2: (<p>Click or drop files here to upload...</p>),
      style: {}
    };
    this.uploadFile1 = '';
    this.uploadFile2 = '';
    this.handleImage1Change = this.handleImage1Change.bind(this);
    this.handleImage2Change = this.handleImage2Change.bind(this);
    this.handleSubmit1 = this.handleSubmit1.bind(this);
    this.handleSubmit2 = this.handleSubmit2.bind(this);
    this.onDragOver = this.onDragOver.bind(this);
    this.onDragLeave = this.onDragLeave.bind(this);
    this.setOriginalText = this.setOriginalText.bind(this);     
	}

	handleSubmit1(e) {
    e.preventDefault();
    if (!this.uploadFile1) {
    	return;
    }
    let data = new FormData();
		data.append('file1', this.uploadFile1);
    data.append('user', 'guestUser');
    console.log(data)

		fetch('/api/uploads/upload/', {
		  method: 'post',
		  body: data
			}).then((res) => {
					this.setState({
	        	status: 'uploading',
            statusMsg1: (<p>Uploading...</p>) 
	      	});
					return res.json();
			}).then((val) =>{
					if(val.message == 'ok'){
						this.setState({
	        		status: 'done',
              statusMsg1: (<p id='checkMark'><i className="fa fa-check"></i></p>)
	      		});
            this.props.updateImages();
            timer = _.delay( this.setOriginalText, 1000);
					};
		}).catch(error => {
      return error;
    });
      this.uploadFile1 = '';
		this.setState({
        image1PreviewUrl: ''
    });
  }
  

  handleSubmit2(e) {
    e.preventDefault();
    if (!this.uploadFile2) {
    	return;
    }
    let data = new FormData();
		data.append('file2', this.uploadFile2);
    data.append('user', 'guestUser');
    console.log(data)

		fetch('/api/uploads/upload/', {
		  method: 'post',
		  body: data
			}).then((res) => {
					this.setState({
	        	status: 'uploading',
            statusMsg2: (<p>Uploading...</p>) 
	      	});
					return res.json();
			}).then((val) =>{
					if(val.message == 'ok'){
						this.setState({
	        		status: 'done',
              statusMsg2: (<p id='checkMark'><i className="fa fa-check"></i></p>)
	      		});
            this.props.updateImages();
            timer = _.delay( this.setOriginalText, 1000);
					};
		});
      this.uploadFile2 = '';
		this.setState({
        image2PreviewUrl: ''
    });
  }

  setOriginalText(){
    this.setState({status: 'idle', statusMsg1: (<p>Click or drop files here to upload...</p>), statusMsg2: (<p>Click or drop files here to upload...</p>)});
  }

  handleImage1Change(e) {
    e.preventDefault();
    if (timer !== '') {
      clearTimeout(timer);
    };
    let reader = new FileReader();
    let file = e.target.files[0];

    
    reader.onloadend = () => {
      this.setState({
        image1PreviewUrl: reader.result,
        style: {background: ''}
      });
      this.uploadFile1 = file;
    }

    reader.readAsDataURL(file)
  }

  handleImage2Change(e) {
    e.preventDefault();
    if (timer !== '') {
      clearTimeout(timer);
    };
    let reader = new FileReader();
    let file = e.target.files[0];

    
    reader.onloadend = () => {
      this.setState({
        image2PreviewUrl: reader.result,
        style: {background: ''}
      });
      this.uploadFile2 = file;
    }

    reader.readAsDataURL(file)
  }

  onDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    this.setState({
        style: {background: '#F7ACCF', border: 'solid 3px black'}
    });
  }

  onDragLeave(e) {
    e.preventDefault();
    this.setState({
        style: {background: '', border: 'dashed'}
    });
  }

        		
	render(){
    let {image1PreviewUrl} = this.state;
    let {image2PreviewUrl} = this.state;
    let image1Preview = this.state.statusMsg1;
    let image2Preview = this.state.statusMsg2;
    if (image1PreviewUrl) {
      image1Preview = (<img src={image1PreviewUrl} className='dropPreview'/>);
    }
    if (image2PreviewUrl) {
      image2Preview = (<img src={image2PreviewUrl} className='dropPreview'/>);
    }
		return (
        <div>
          <div
            onDragOver={this.onDragOver}
            onDragLeave={this.onDragLeave}
            className='dropZoneContainer'>
						<div className='dropZone' id="upload-file-container" style={this.state.style}>{image1Preview}
							<input type='file' name='file1' onChange={this.handleImage1Change} />
						</div>
        		<a href="" onClick={this.handleSubmit1} className="icon-button cloudicon">
              <i className="fa fa-cloud-upload"></i><span></span>
            </a>
          </div>

          <div
            onDragOver={this.onDragOver}
            onDragLeave={this.onDragLeave}
            className='dropZoneContainer'>
						<div className='dropZone' id="upload-file-container" style={this.state.style}>{image2Preview}
							<input type='file' name='file2' onChange={this.handleImage2Change} />
						</div>
        		
          </div>
          <a href="" onClick={this.handleSubmit2} className="icon-button cloudicon">
              <i className="fa fa-cloud-upload"></i><span></span>
            </a>
        </div>
      );
	}
}

// DropZonePlace.propTypes = {
//   onDrop: React.PropTypes.func,
//   onDragOver: React.PropTypes.func,
//   onDragLeave: React.PropTypes.func,
// };


export default DropZonePlace;