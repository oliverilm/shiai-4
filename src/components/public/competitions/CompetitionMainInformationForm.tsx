import "./index.scss"
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import React from 'react';
import { TextField, FormLabel } from "@material-ui/core";

interface MainFormProps {
  editorState: EditorState;
  setEditorState: Function;
  name: string;
  setName: Function;
}

const CompetitionMainInformationForm = ({editorState, setEditorState, name, setName}: MainFormProps) => {

  return (
    <div style={{
      width: "100%",
      display: "flex",
      flexDirection: "column"
    }}>
        <TextField 
          required 
          value={name}
          onChange={e => {setName(e.target.value)}}
          id="standard-required" 
          label="Competition Name" 
          defaultValue="My competition" />
        <div style={{ marginTop: "2em"}}>

          <FormLabel> Competition Description</FormLabel>
          <Editor
            editorState={editorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onEditorStateChange={(e) => {setEditorState(e)}}
          />

        </div>

    </div>
  )
}

export default CompetitionMainInformationForm;