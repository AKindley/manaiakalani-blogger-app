import React, {Component} from 'react';
import PostField from './PostField';
import RichTextEditor from 'react-rte';
import './editor.css'

class Editor extends Component {
  // static propTypes = {
  //   onChange: PropTypes.func
  // };

  constructor(props) {
    super(props);

    this.state = {
      value: this.props.content 
        ? RichTextEditor.createValueFromString(this.props.content, 'html')
        : RichTextEditor.createEmptyValue()
    };
  }

  // componentWillReceiveProps(nextProps) {
  //   console.log('receiving', nextProps)
  //   this.setState({
  //     value: nextProps.content 
  //       ? RichTextEditor.createValueFromString(nextProps.content, 'html')
  //       : RichTextEditor.createEmptyValue()
  //   });
  // }
  insertText(text, iframe){ //takes a string (google drive fileId) and a boolean value (iframe) and inserts an img tag into the editor. 
	this.state.value.toString('html' );
	var newValue = '';
	if (iframe) { //if true, a data-id attribute is added to the tag to differentiate it from normal images
		newValue = `${this.state.value.toString('html')} <p><img data-id="${text}" src="https://drive.google.com/thumbnail?id=${text}&sz=w480-h360"/></p>`;
	}
	else {
		newValue = `${this.state.value.toString('html')} <p><img src="https://drive.google.com/thumbnail?id=${text}&sz=w480-h360"/></p>`;
	}
	this.setState({
		value: RichTextEditor.createValueFromString(newValue, 'html')
    });
  }
  getValueHtml = () => {
    return this.state.value.toString('html');
  }

  // getValueText = () => {
  //   return this.state.value.toString('markdown');
  // }
 
	
  onChange = (value) => {
    this.setState({value});
    if (this.props.onChange) {
      // Send the changes up to the parent component as an HTML string.
      // This is here to demonstrate using `.toString()` but in a real Editor it
      // would be better to avoid generating a string on each change.
      this.props.onChange(
        value.toString('html')
      );
    }
  };

  render () {
	const toolbarConfig = {
		display: ['HISTORY_BUTTONS', 'IMAGE_BUTTON', 'LINK_BUTTONS', 'BLOCK_TYPE_DROPDOWN', 'BLOCK_TYPE_BUTTONS'],
		BLOCK_TYPE_DROPDOWN: [
		  {label: 'Normal', style: 'unstyled'},
		  {label: 'Heading Large', style: 'header-one'},
		  {label: 'Heading Medium', style: 'header-two'},
		  {label: 'Heading Small', style: 'header-three'}
		],
		BLOCK_TYPE_BUTTONS: [
		  {label: 'UL', style: 'unordered-list-item'},
		  {label: 'OL', style: 'ordered-list-item'}
    ]};
    return (
	  <div>
      <PostField title="Content:" htmlFor="postContent">
		
          <RichTextEditor
			toolbarConfig={toolbarConfig}
            id="postContent" 
            className="post-content post-content-editor"
            value={this.state.value}
            onChange={this.onChange}
            placeholder="Type here..."
          />
		 
      </PostField>
	  </div>
    );
  }


}

export default Editor;
