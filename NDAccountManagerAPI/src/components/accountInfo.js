import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import {
  Grid, Paper, TableContainer, Table, TableHead, TableRow, TableCell,
  TableBody, ButtonGroup, Button, TextField, MenuItem, Select, InputLabel,
  FormControl, Dialog, DialogActions, DialogContent, DialogTitle,
  FormControlLabel, Checkbox
} from "@mui/material";
import { styled } from "@mui/system";
import AccountInfoForm from "./accountInfoForm";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ShareIcon from "@mui/icons-material/Share";
import { useToasts } from "react-toast-notifications";
import * as actions from "../actions/AccountInfo";
import axios from 'axios';

// Mocked list of users for demonstration
const users = [
  { id: 1, name: "User 1" },
  { id: 2, name: "User 2" },
  { id: 3, name: "User 3" },
];

const StyledPaper = styled(Paper)(({ theme }) => ({
  margin: theme.spacing(2),
  padding: theme.spacing(2),
}));

const StyledTableHead = styled(TableHead)(({ theme }) => ({
  "& .MuiTableCell-head": {
    fontSize: "1.25rem",
  },
}));

const AccountInfo = ({ fetchAllaccountInfo, deleteaccountInfo, AccountInfoList, shareAccount }) => {
  const dispatch = useDispatch();
  const { addToast } = useToasts();
  const [currentId, setCurrentId] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterField, setFilterField] = useState("accountName");
  const [openShareDialog, setOpenShareDialog] = useState(false);
  const [isUnlimited, setIsUnlimited] = useState(false);
  const [shareDuration, setShareDuration] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [accountName, setAccountName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [category, setCategory] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    fetchAllaccountInfo();
  }, [fetchAllaccountInfo]);

  const onDelete = (id) => {
    if (window.confirm("Are you sure to delete this record?")) {
      deleteaccountInfo(id, () => addToast("Deleted Successfully", { appearance: "info" }));
    }
  };

  const handleShare = async () => {
    const payload = {
      accountInfo: {
        accountName: accountName,
        userName: userName,
        password: password,
        category: category,
        email: email
      },
      accountInfoId: currentId, // Ensure the correct account ID is included
      userIds: selectedUsers, // Ensure this is an array of strings
      shareDuration: isUnlimited ? null : shareDuration, // Ensure this is a valid Date or null
      isUnlimited: isUnlimited
    };
  
    console.log('Payload:', payload);
  
    try {
      const response = await axios.post('http://localhost:5000/api/accountInfo/shared', payload);
      console.log('Response:', response);
      setOpenShareDialog(false);
      addToast("Account shared successfully", { appearance: "success" });
    } catch (error) {
      console.error('Error:', error);
  
      let errorMessage = 'Unknown error';
      if (error.response) {
        console.error('Error data:', error.response.data);
        console.error('Error status:', error.response.status);
        console.error('Error headers:', error.response.headers);
        errorMessage = error.response.data.message || JSON.stringify(error.response.data);
      } else if (error.request) {
        console.error('Error request:', error.request);
        errorMessage = 'No response received from server';
      } else {
        console.error('Error message:', error.message);
        errorMessage = error.message;
      }
  
      addToast(`Failed to share account: ${errorMessage}`, { appearance: "error" });
    }
  };
  const filteredAccounts = AccountInfoList.filter((account) =>
    account[filterField]?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <StyledPaper elevation={3}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <AccountInfoForm {...{ currentId, setCurrentId }} />
        </Grid>
        <Grid item xs={6}>
          <FormControl variant="outlined" fullWidth style={{ marginBottom: "16px" }}>
            <InputLabel>Filter By</InputLabel>
            <Select
              label="Filter By"
              value={filterField}
              onChange={(e) => setFilterField(e.target.value)}
            >
              <MenuItem value="accountName">Account Name</MenuItem>
              <MenuItem value="userName">Username</MenuItem>
              <MenuItem value="email">Email</MenuItem>
              <MenuItem value="category">Category</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Search"
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ marginBottom: "16px" }}
          />
          <TableContainer>
            <Table>
              <StyledTableHead>
                <TableRow>
                  <TableCell>Account Name</TableCell>
                  <TableCell>Username</TableCell>
                  <TableCell>Password</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </StyledTableHead>
              <TableBody>
                {filteredAccounts.length > 0 ? (
                  filteredAccounts.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell>{record.accountName}</TableCell>
                      <TableCell>{record.userName}</TableCell>
                      <TableCell>{record.password}</TableCell>
                      <TableCell>{record.category}</TableCell>
                      <TableCell>{record.email}</TableCell>
                      <TableCell>
                        <ButtonGroup variant="text">
                          <Button onClick={() => setCurrentId(record.id)}>
                            <EditIcon color="primary" />
                          </Button>
                          <Button onClick={() => onDelete(record.id)}>
                            <DeleteIcon color="secondary" />
                          </Button>
                          <Button onClick={() => { 
                            setCurrentId(record.id); 
                            setAccountName(record.accountName);
                            setUserName(record.userName);
                            setPassword(record.password);
                            setCategory(record.category);
                            setEmail(record.email);
                            setOpenShareDialog(true); 
                          }}>
                            <ShareIcon color="action" />
                          </Button>
                        </ButtonGroup>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6}>No account information available</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>

      <Dialog open={openShareDialog} onClose={() => setOpenShareDialog(false)}>
        <DialogTitle>Share Account</DialogTitle>
        <DialogContent>
          <FormControlLabel
            control={
              <Checkbox
                checked={isUnlimited}
                onChange={(e) => setIsUnlimited(e.target.checked)}
                color="primary"
              />
            }
            label="Unlimited Access"
          />
          {!isUnlimited && (
            <TextField
              type="date"
              label="Share Duration"
              fullWidth
              value={shareDuration}
              onChange={(e) => setShareDuration(e.target.value)}
              style={{ marginBottom: "16px" }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          )}
          <FormControl variant="outlined" fullWidth>
            <InputLabel>Select Users</InputLabel>
            <Select
              multiple
              label="Select Users"
              value={selectedUsers}
              onChange={(e) => setSelectedUsers(e.target.value)}
              renderValue={(selected) => selected.map(userId => users.find(user => user.id === userId)?.name).join(', ')}
            >
              {users.map((user) => (
                <MenuItem key={user.id} value={user.id}>
                  {user.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenShareDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleShare} color="primary">
            Share
          </Button>
        </DialogActions>
      </Dialog>
    </StyledPaper>
  );
};

const mapStateToProps = (state) => ({
  AccountInfoList: state.AccountInfo.list,
});

const mapActionToProps = {
  fetchAllaccountInfo: actions.fetchAll,
  deleteaccountInfo: actions.Delete,
  shareAccount: actions.shareAccount,
};

export default connect(mapStateToProps, mapActionToProps)(AccountInfo);