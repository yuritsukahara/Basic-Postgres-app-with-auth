import { DataGrid, GridColDef, GridRowId, GridRowParams, GridRowSelectionModel, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarExport, GridToolbarQuickFilter, useGridApiRef } from '@mui/x-data-grid';
import { useState, useEffect } from "react";
import { useAtom } from 'jotai';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, List, ListItem, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';
import React from 'react';
import { api } from '@/lib/api';
import LoadingIndicator from '@/components/LoadingIndicator';

// Define types for column and row data

interface Row {
  [key: string]: any;
}

export default function DataTable({ modal, data }: { modal: React.Dispatch<React.SetStateAction<boolean>>, data: any }) {
  const [loading, setLoading] = useState(true);
  const [tableColumns, setTableColumns] = useState<GridColDef[]>([]);
  const [tableRows, setTableRows] = useState<Row[]>([]);
  const [deleteDialog, setDeleteDialog] = useState(false)
  const [selectedRows, setSelectedRows] = useState<GridRowId[]>([])



  const getHeader = async () => {
    //pass
  };

  const getRows = async () => {
    //pass
  };

  const apiDataTable = useGridApiRef();

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <Box>
          <Tooltip title="Deletar Selecionados">
            <Button
              startIcon={<DeleteIcon />}
              onClick={() => setDeleteDialog(true)}
              size='small'
            >
              Deletar Selecionados
            </Button>
          </Tooltip>
          <GridToolbarColumnsButton />
          <GridToolbarExport />
        </Box>
        <Box className='flex w-full p-1'>
          <GridToolbarQuickFilter className='w-full p-2' />
        </Box>
      </GridToolbarContainer >
    );
  }

  async function deleteSelection() {
    for (const item of selectedRows) {
      let rowData = getRowData(item)
      let nome = rowData?.aplicacao;

      try {
        await api.users[':id{[0-9]+}'].$delete({ param: { id: '1' } });
        toast(`Deletado item ${nome}`, { type: 'success' });
      } catch (error) {
        toast(`Falha ao deletar item ${nome}`, { type: 'error' });
      }
    }
    getRows();
  }

  const handleDelete = () => {
    deleteSelection()
    setDeleteDialog(false)
  }

  const handleSelectedRows = (e: any) => {
    setSelectedRows(e)
  }

  const getRowData = (id: any) => tableRows.find(item => {
    if (item.id === id) {
      if (item.codigo) {
        return item.codigo
      } else if (item.descricao) {
        return item.descricao
      } else {
        return item
      }
    }
  })

  const handleRowClicked = (e: GridRowParams) => {
    modal(true)
  }

  return (
    <>
      {loading ? (
        <LoadingIndicator />
      ) : (
        <Box sx={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={tableRows}
            columns={tableColumns}
            checkboxSelection
            disableRowSelectionOnClick
            onRowDoubleClick={(e) => handleRowClicked(e)}
            onRowSelectionModelChange={(e) => { handleSelectedRows(e) }}
            autoHeight
            initialState={{
              columns: {
                columnVisibilityModel: {
                  id: false,
                },
              },
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
              density: "compact",
            }}
            pageSizeOptions={[5, 10, 25]}
            apiRef={apiDataTable}
            slots={{ toolbar: CustomToolbar }}
            sx={{
              "& .MuiDataGrid-row:hover": {
                cursor: "pointer" // Or 'transparent' or whatever color you'd like
              }
            }}
          />
        </Box>
      )}

      <Dialog
        sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
        maxWidth="xs"
        open={deleteDialog}
      >
        <DialogTitle>Deletar Itens?</DialogTitle>
        <DialogContent dividers>
          {selectedRows?.map((item) => {
            let rowData = getRowData(item)
            return (
              <DialogContent key={rowData?.id} className='p-0' dividers >
                <List >
                  <ListItem className='p-0'>{rowData && `Código: ${rowData.codigo}`}</ListItem>
                  <ListItem className='p-0'>{rowData && `Aplicação: ${rowData.aplicacao}`}</ListItem>
                </List>
              </DialogContent>
            )
          })
          }
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => setDeleteDialog(false)}>
            Cancel
          </Button>
          <Button onClick={handleDelete}>sim</Button>
        </DialogActions>
      </Dialog >
    </>

  );
}
