// src/components/SharedAccountInfo.js
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchShared } from "../actions/AccountInfo";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper
} from "@mui/material";
import { styled } from "@mui/system";

const StyledPaper = styled(Paper)(({ theme }) => ({
  margin: theme.spacing(2),
  padding: theme.spacing(2),
}));

const StyledTableHead = styled(TableHead)(({ theme }) => ({
  "& .MuiTableCell-head": {
    fontSize: "1.25rem",
  },
}));

const SharedAccountInfo = ({ fetchShared, sharedAccountInfoList }) => {
  useEffect(() => {
    fetchShared();
  }, [fetchShared]);

  return (
    <StyledPaper elevation={3}>
      <TableContainer>
        <Table>
          <StyledTableHead>
            <TableRow>
              <TableCell>Account Name</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Shared With</TableCell>
            </TableRow>
          </StyledTableHead>
          <TableBody>
            {sharedAccountInfoList.length > 0 ? (
              sharedAccountInfoList.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>{record.accountName}</TableCell>
                  <TableCell>{record.userName}</TableCell>
                  <TableCell>{record.email}</TableCell>
                  <TableCell>{record.sharedWith}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4}>No shared account information available</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </StyledPaper>
  );
};

const mapStateToProps = (state) => ({
  sharedAccountInfoList: state.AccountInfo.sharedList,
});

const mapActionToProps = {
  fetchShared,
};

export default connect(mapStateToProps, mapActionToProps)(SharedAccountInfo);
