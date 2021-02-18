import "./index.scss"
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import React from 'react';
import { TextField, FormLabel } from "@material-ui/core";
import styled from "styled-components"

const Root = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const MarginTop = styled.div`
  margin-top: 2em;
`;
interface MainFormProps {
  editorState: EditorState;
  setEditorState: Function;
  name: string;
  setName: Function;
}

const CompetitionMainInformationForm = ({editorState, setEditorState, name, setName}: MainFormProps) => (
    <Root>
        <TextField 
          required 
          value={name}
          onChange={e => {setName(e.target.value)}}
          id="standard-required" 
          label="Competition Name" 
          defaultValue="My competition" />

        <MarginTop>
          <FormLabel> Competition Description</FormLabel>
          <Editor
            editorState={editorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onEditorStateChange={(e) => {setEditorState(e)}}
          />
        </MarginTop>
    </Root>
)


export default CompetitionMainInformationForm;