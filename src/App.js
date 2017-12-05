import React, { Component } from 'react';
import _ from 'lodash';
// import axios from 'axios';


import './App.css';

var timer = '';

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
      response: (<div className="init"></div>)
    };
    this.uploadFile1 = '';
    this.uploadFile2 = '';
    this.handleImage1Change = this.handleImage1Change.bind(this);
    this.handleImage2Change = this.handleImage2Change.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setOriginalText = this.setOriginalText.bind(this);     
  }

  handleSubmit(e) {
    e.preventDefault();
  if(!this.uploadFile1 || !this.uploadFile2){
    return;
  }
    let data = new FormData();
		data.append('file1', this.uploadFile1);
    data.append('file2', this.uploadFile2);
    console.log(data);

		fetch('http://45.55.44.21/face-recognition/compare', {
		  method: 'post',
		  body: data
			}).then((res) => {
					return res.json();
			}).then((val) =>{
					if(val.code == "200"){
						this.setState({
              status: 'done',
              statusMsg1: (<div><p id='checkMark'><i className="fa fa-check">Image processed!</i></p></div>),
              statusMsg2: (<div><p id='checkMark'><i className="fa fa-check">Image processed!</i></p></div>),
              response : (<div className="success"><p><i className="fa fa-check fa-2x" id="pass" aria-hidden="true"></i>&nbsp; Passport and id matches</p></div>)
              
            });
            // console.log(val)
            timer = _.delay( this.setOriginalText, 1000);            
          }  

          if(val.code == "500"){
            this.setState({
              status: 'done',
              statusMsg1: (<div><p id='checkMark'><i className="fa fa-check">Image processed!</i></p></div>),
              statusMsg2: (<div><p id='checkMark'><i className="fa fa-check">Image processed!</i></p></div>),
              response : (<div className="success"><p><i className="fa fa-times fa-2x" id="no-pass" aria-hidden="true"></i>&nbsp; Passport and id do not match</p></div>)
            })
            // console.log(val)
            timer = _.delay( this.setOriginalText, 1000);            
          }          
    }).catch(error => {
      // return error;
      this.setState({
        statusMsg1: (<div><p id='Nocheck'><i className="fa fa-times">&nbsp;Image not processed!<div>There might be a problem with your connection!</div></i></p></div>),
        statusMsg2: (<div><p id='Nocheck'><i className="fa fa-times">&nbsp;Image not processed!<div>There might be a problem with your connection!</div></i></p></div>)
      })
    });
    this.uploadFile1 = null;
    this.uploadFile2 = null;
		this.setState({        
        image1PreviewUrl: '',
        image2PreviewUrl: '',
        status: 'uploading',
        statusMsg1: (<div><p>Uploading...</p></div>),
        statusMsg2: (<div><p>Uploading...</p></div>)
    });
  }

  setOriginalText(){
    this.setState({status: 'idle', statusMsg1: (<div><i className="fa fa-plus" aria-hidden="true"></i><p>Upload id card</p></div>), statusMsg2: (<div><i className="fa fa-plus" aria-hidden="true"></i><p>Upload passport</p></div>)});
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
        image2PreviewUrl: reader.result,
        style: {background: ''}
      });
      this.uploadFile2 = file;
    }

    reader.readAsDataURL(file)
  }

  render(){
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
          <button className="analyze" onClick={this.handleSubmit}>Analyze</button>
          {response}
        </div>
      </div>
    );
	}
  
}


export default App;