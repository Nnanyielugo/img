import React, { Component } from 'react';
import _ from 'lodash';
import {Modal, Button} from 'react-bootstrap';

let timer = '';

class App extends Component {
  constructor(props){
		super(props);
		this.state = {
      file1: null,
      file2: null,
      image1PreviewUrl: '',
      image2PreviewUrl: '',
      status: 'idle',
      statusMsg1: (<div><i className="fa fa-plus" aria-hidden="true"></i><p>Upload id card</p></div>),
      statusMsg2: (<div><i className="fa fa-plus" aria-hidden="true"></i><p>Upload passport</p></div>),
      style: {},
      validate: '', 
      isLoading: true,
      showModal: false,
      buttonText: 'Analyze',
      modalText: '',
      response: <div className="init"></div>
    };
    this.uploadFile1 = '';
    this.uploadFile2 = '';
    this.handleImage1Change = this.handleImage1Change.bind(this);
    this.handleImage2Change = this.handleImage2Change.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setOriginalText = this.setOriginalText.bind(this);
    this.close = this.close.bind(this);     
  }

  close(e) {
    e.preventDefault();
    this.setState({ showModal: false });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({isLoading: true})
  if(!this.uploadFile1 || !this.uploadFile2){
    return;
  }
    let data = new FormData();
		data.append('file1', this.uploadFile1);
    data.append('file2', this.uploadFile2);
    // console.log(data);

		fetch('http://45.55.44.21/face-recognition/compare', {
		  method: 'post',
		  body: data
			}).then((res) => {
					return res.json();
			}).then((val) =>{
					if(val.facesMatch == true){
						this.setState({
              status: 'done',
              statusMsg1: (<div><p><i className="fa fa-check">Image processed!</i></p></div>),
              statusMsg2: (<div><p><i className="fa fa-check">Image processed!</i></p></div>),
              response : (<div className="success"><p><i className="fa fa-check fa-2x" id="pass" aria-hidden="true"></i>&nbsp; Passport and id matches</p></div>),
              showModal: true, 
              modalText: (<div className="successModal"><p><i className="fa fa-check fa-2x" id="pass" aria-hidden="true"></i>&nbsp; Passport and id matches</p></div>),
              buttonText: 'Done'
            });
            console.log(val)
            // timer = _.delay( this.setOriginalText, 3000);            
          }  

          if(val.facesMatch == false){
            if(val.code == "500"){
              this.setState({
              status: 'done',
              statusMsg1: (<div><p><i className="fa fa-check">Image processed!</i></p></div>),
              statusMsg2: (<div><p><i className="fa fa-check">Image processed!</i></p></div>),
              response : (<div className="success"><p><i className="fa fa-times fa-2x" id="no-pass" aria-hidden="true"></i>&nbsp; No face found!</p></div>),
              showModal: true, 
              modalText: (<div className="successModal"><p><i className="fa fa-times fa-2x" id="no-pass" aria-hidden="true"></i>&nbsp; No face found!</p></div>),
              buttonText: 'Done'
            });
            console.log(val)
            // timer = _.delay( this.setOriginalText, 3000);
            } else if(val.code =="200"){
              this.setState({
              status: 'done',
              statusMsg1: (<div><p><i className="fa fa-check">Image processed!</i></p></div>),
              statusMsg2: (<div><p><i className="fa fa-check">Image processed!</i></p></div>),
              response : (<div className="success"><p><i className="fa fa-times fa-2x" id="no-pass" aria-hidden="true"></i>&nbsp; Passport and id do not match!</p></div>),
              showModal: true, 
              modalText: (<div className="successModal"><p><i className="fa fa-times fa-2x" id="no-pass" aria-hidden="true"></i>&nbsp; Passport and id do not match!</p></div>),
              buttonText: 'Done'
            })
            console.log(val)
            // timer = _.delay( this.setOriginalText, 5000);  
            } else{}
                      
          }          
    }).catch(error => {
      // return error;
      this.setState({
        statusMsg1: (<div><p id='Nocheck'><i className="fa fa-times">&nbsp;Image not processed!<div>There might be a problem with your connection!</div></i></p></div>),
        statusMsg2: (<div><p id='Nocheck'><i className="fa fa-times">&nbsp;Image not processed!<div>There might be a problem with your connection!</div></i></p></div>),
        isLoading: true,
        showModal: true, 
        modalText: (<div><p id='Nocheck'><i className="fa fa-times">&nbsp;Image not processed!<div>There might be a problem with your connection!</div></i></p></div>),
        buttonText: 'Error!'
      });
    });
    this.uploadFile1 = null;
    this.uploadFile2 = null;
		this.setState({        
        image1PreviewUrl: '',
        image2PreviewUrl: '',
        status: 'uploading',
        statusMsg1: (<div><p>Uploading...</p></div>),
        statusMsg2: (<div><p>Uploading...</p></div>),
        isLoading: true,
        buttonText: <div className="loader"></div>
    });
  }

  setOriginalText(){
    this.setState({
      status: 'idle', 
      statusMsg1: (<div><i className="fa fa-plus" aria-hidden="true"></i><p>Upload id card</p></div>), 
      statusMsg2: (<div><i className="fa fa-plus" aria-hidden="true"></i><p>Upload passport</p></div>),
      isLoading: true,
      response: (<div className="init"></div>),
      buttonText: 'Analyze',
      showModal: false
      });
  }

  handleImage1Change(e) {
    e.preventDefault();
    if (timer !== '') {
      clearTimeout(timer);
    }
    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        isLoading: false,
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
    }
    let reader = new FileReader();
    let file = e.target.files[0];

    
    reader.onloadend = () => {
      this.setState({
        isLoading: false,
        image2PreviewUrl: reader.result,
        style: {background: ''}
      });
      this.uploadFile2 = file;
    }

    reader.readAsDataURL(file)
  }

  render(){
    let modalText = this.state.modalText;
    let buttonText = this.state.buttonText;
    let response = this.state.response;
		let {image1PreviewUrl} = this.state;
    let {image2PreviewUrl} = this.state;

    let image1Preview = this.state.statusMsg1;
    let image2Preview = this.state.statusMsg2;

    if (image1PreviewUrl) {
      image1Preview = (<img src={image1PreviewUrl} className="dropPreview" alt=""/>);
    }
    if (image2PreviewUrl) {
      image2Preview = (<img src={image2PreviewUrl} className="dropPreview" alt=""/>);
    }
		
    return (
      <div className="App">
        <div className="topbar"></div>
       
        <div className='container'>
          <div className="row">
            <div className="col-sm-2 col-md-2 col-xs-2"></div>
            <div className="col-sm-4 col-md-4 col-xs-8 id">
              <div className='dropZone' id="upload-file-container" style={this.state.style}>{image1Preview}
                <input type='file' value='' name='file1' onChange={this.handleImage1Change} />
              </div>                    
            </div>
            <div className="col-xs-1"></div>

            <div className="col-xs-2"></div>
            <div className="col-sm-4 col-md-4 col-xs-8 passport">            
              <div className='dropZone' id="upload-file-container" style={this.state.style}>{image2Preview}
                <input type='file' value='' name='file1' onChange={this.handleImage2Change} />
              </div>                         
            </div>
            <div className="col-sm-2 col-md-2 col-xs-2"></div>
          </div>
        </div>  
              

        <div className="container-fluid">
          <button className="analyze btn btn-default" onClick={this.handleSubmit} disabled={this.state.isLoading}>{buttonText}</button>
          {response}
        </div>
        
        <Modal show={this.state.showModal} onHide={this.close} bsSize="small" aria-labelledby="contained-modal-title-sm" className="custom-modal" >
          <Modal.Body className="modalBody" closeButton>
            {modalText}            
          </Modal.Body>          
          <Button className="modalButton" onClick={this.setOriginalText}>OK</Button>
          
        </Modal>
  
      </div>
    );
	}
  
}


export default App;