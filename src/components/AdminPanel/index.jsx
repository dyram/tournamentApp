import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import AddTournament from "./AddTournament";

const AdminPanel = ({ emitData }) => {
  const addData = (data) => {
    if (data != null) {
      emitData(data);
    }
  };

  return (
    <div>
      <AddTournament setData={(data) => addData(data)} />
    </div>
  );
};

export default AdminPanel;
