import React from "react";
import logo from "./logo.svg";
import "./App.css";

function ListComponent({ entry, setList, list, index, setText }) {
  const [editmode, setEditmode] = React.useState(false);
  const [edittext, setEdittext] = React.useState("");
  return (
    <div>
      {entry}
      <button
        onClick={() => {
          setEditmode(!editmode);
        }}
      >
        {editmode ? "cancel" : "edit"}
      </button>
      <button
        onClick={() => {
          setList(
            list.filter((entry, i) => {
              return i !== index;
            })
          );
        }}
      >
        remove
      </button>
      {editmode ? (
        <div>
          <input
            onChange={(event) => {
              setEdittext(event.target.value);
            }}
            value={edittext}
          ></input>
          <button
            onClick={() => {
              setEditmode(!editmode);
              setList(
                list.map((entry, i) => {
                  if (i !== index) {
                    return entry;
                  } else {
                    return edittext;
                  }
                })
              );
            }}
          >
            Done
          </button>
        </div>
      ) : null}
    </div>
  );
}

function List({ list, setList, setText }) {
  function createList(entry, index) {
    return (
      <ListComponent
        index={index}
        list={list}
        setList={setList}
        entry={entry}
        setText={setText}
      ></ListComponent>
    );
  }
  return list.map(createList);
}

function InputField({ text, setText }) {
  return (
    <input
      onChange={(event) => {
        setText(event.target.value);
      }}
      value={text}
    ></input>
  );
}

function AddNew({ setList, text, list }) {
  return (
    <button
      onClick={() => {
        setList([...list, text]);
      }}
    >
      ADD NEW ENTRY
    </button>
  );
}

function App() {
  const [list, setList] = React.useState([]);
  const [text, setText] = React.useState("");
  return (
    <div className="App">
      <AddNew setList={setList} text={text} list={list}></AddNew>
      <InputField text={text} setText={setText}></InputField>
      <List setList={setList} list={list} setText={setText}></List>
    </div>
  );
}

export default App;
