import React,{Component} from 'react';
import Divider from '@mui/material/Divider';

export class Upload extends Component{
    constructor(props) {
      super(props);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.fileInput = React.createRef();
    }
    handleSubmit(event) {
      event.preventDefault();
      alert(
        `Selected file - ${this.fileInput.current.files[0].name}`
      );
    }
  
    render(){
        return (
                <div className='content'>
                    <form className='textforms' onSubmit={this.handleSubmit}>
                        <Divider><h4>Upload File</h4>  </Divider>
                        <br />
                        <label>
                        <input type="file" ref={this.fileInput} />
                        </label>
                        <br />
                        <button type="submit">Submit</button>
                    </form>
                </div>
        );
    }
}