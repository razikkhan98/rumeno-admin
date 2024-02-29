import React, { useEffect, useState } from "react";
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@material-ui/core";
import Mean from "../Mean";
import Navbar from "../Navbar";
import axios from "axios";

// Sample data
const initialData = [
  { id: 1, name: "Admin", product: "prd1", status: "success" },
  { id: 2, name: "Test", product: "prd2", status: "active" },
  // Add more items as needed
];

const ClntOrdTbl = () => {
  const [data, setData] = useState(initialData);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    product: "",
  });

  const handleOpenDialog = (item = {}) => {
    setOpenDialog(true);
    setSelectedItem(item);
    setFormData({
      name: item.name || "",
      product: item.product || "",
    });
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedItem({});
    setFormData({
      name: "",
      product: "",
    });
  };

  const handleSaveData = async() => {
    var newItem = ''
    if (selectedItem.id) {
      // Edit existing item
      setData((prevData) =>
        prevData.map((item) =>
          item.id === selectedItem.id ? { ...item, ...formData } : item
        )
      );
      console.log("Edit Item:", selectedItem.id, formData);
      // console.log("Edited Item:", {
      //   id: selectedItem.id,
      //   name: formData.name,
      //   product: formData.product,
      // });
    } else {
      // Add new item
     newItem = { id: data.length + 1, ...formData };
      setData((prevData) => [
        ...prevData,
        { id: prevData.length + 1, ...formData },
      ]);
      console.log("Add New Item:", newItem);
      
      // console.log("Added Item:", {
      //   id: prevData.length + 1,
      //   name: formData.name,
      //   product: formData.product,
      // });
    }
    console.log(newItem)

    try {
      const response = await axios.post("https://example.com/api/endpoint",
        newItem
      );
      console.log("Server Response:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }

    handleCloseDialog();
  };

  const handleDelete = (id) => {
    setData((prevData) => {
      const deletedItem = prevData.find((item) => item.id === id);
      const newData = prevData.filter((item) => item.id !== id);
      console.log("Delete Item:", deletedItem);
      return newData;
    });
  };


  return (
    <>
      <section className="bg-menu-theme">
        <div className="layout-wrapper layout-content-navbar">
          <div className="layout-container">
            <Mean />
            <div className="layout-page">
              {/* <!-- Navbar --> */}
              <Navbar />
              <div className="container-lg mt-4">
                <div>
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead className="bg-secondary">
                        <TableRow>
                          <TableCell className="text-center">No</TableCell>
                          <TableCell className="text-center">Client Name</TableCell>
                          <TableCell className="text-center">Product</TableCell>
                          <TableCell className="text-center">Status</TableCell>
                          <TableCell className="text-center">EDIT</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {data.map((item ,index) => (
                          <TableRow key={item.id}>
                            <TableCell className="text-center">{++index}</TableCell>
                            <TableCell className="text-center">{item.name}</TableCell>
                            <TableCell className="text-center">{item.product}</TableCell>
                            <TableCell className="text-center">{item.status}</TableCell>
                            <TableCell className="text-center">
                              <Button
                                variant="outlined"
                                color="primary"
                                onClick={() => handleOpenDialog(item)}
                              >
                                Edit
                              </Button>
                              <Button
                                variant="outlined"
                                color="secondary"
                                onClick={() => handleDelete(item.id)}
                              >
                                Delete
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>

                  <Button className="mt-3"
                    variant="contained"
                    color="primary"
                    onClick={() => handleOpenDialog()}
                  >
                    Add
                  </Button>

                  <Dialog open={openDialog} onClose={handleCloseDialog}>
                    <DialogTitle>
                      {selectedItem.id ? "Edit Item" : "Add New Item"}
                    </DialogTitle>
                    <DialogContent>
                      <TextField
                        label="Name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        fullWidth
                        margin="normal"
                      />
                      <TextField
                        label="Product"
                        value={formData.product}
                        onChange={(e) =>
                          setFormData({ ...formData, product: e.target.value })
                        }
                        fullWidth
                        margin="normal"
                      />
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleCloseDialog} color="primary">
                        Cancel
                      </Button>
                      <Button onClick={handleSaveData} color="primary">
                        Save
                      </Button>
                    </DialogActions>
                  </Dialog>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ClntOrdTbl;
