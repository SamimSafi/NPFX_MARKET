import {
  Box,
  Card,
  Table,
  TableRow,
  TableCell,
  Typography,
  Divider,
  TableBody,
  TableHead,
  Button,
} from '@mui/material';
import { PropertyDetails } from 'src/@types/foamCompanyTypes/systemTypes/PropertyType';
import Label from 'src/components/Label';
import { useStore } from 'src/stores/store';
interface Props {
  row: PropertyDetails; // PropertyDetails passed as a prop
}

export default function PropertyDetailsTablerow({ row }: Props) {
  const { PropertyStore } = useStore();
  const { setOpenClosePaymentDialog, setOpenCloseAssignDialog, setPayment, setAssignment } =
    PropertyStore;

  return (
    <>
      {/* General Information */}
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
          justifyContent: 'flex-start',
        }}
      >
        <Card
          sx={{
            pt: 2,
            pb: 2,
            px: 5,
            width: '100%',
            mb: 2,
          }}
        >
          {/* Header Section */}
          <Box
            sx={{
              textAlign: 'center',
              mb: 3,
              overflowX: 'auto',
              overflowY: 'hidden',
              '&::-webkit-scrollbar': { height: 6 },
              '&::-webkit-scrollbar-track': { backgroundColor: '#999' },
              '&::-webkit-scrollbar-thumb': { backgroundColor: '#555', borderRadius: 2 },
            }}
          >
            {/* Displaying Name and Model */}
            <Typography
              variant="h5"
              sx={{ fontSize: 18, textAlign: 'center', mb: 1, color: 'warning.main' }}
              color="text.secondary"
              gutterBottom
            >
              <Label
                variant="ghost"
                sx={{ textTransform: 'capitalize', fontSize: 18, p: 2 }}
                color="primary"
              >
                {row.name} {/* Property name */}
              </Label>
            </Typography>
            <Typography variant="h6" sx={{ textAlign: 'center', fontSize: 16, mb: 2 }}>
              Model: {row.model}
            </Typography>

            {/* Displaying Details, Price, Category, Condition */}
            <Box sx={{ display: 'flex', justifyContent: 'space-around', mb: 2 }}>
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                  Price:
                </Typography>
                <Typography variant="body2">${row.price}</Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                  Category:
                </Typography>
                <Typography variant="body2">{row.category}</Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                  Condition:
                </Typography>
                <Typography variant="body2">{row.condition}</Typography>
              </Box>
            </Box>

            {/* Displaying Details */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                Details:
              </Typography>
              <Typography variant="body2">{row.details}</Typography>
            </Box>

            {/* Divider */}
            <Divider sx={{ my: 2 }} />
          </Box>

          {/* List Section */}
          <Box>
            {/* Assignments Table */}
            {row.assignments.length > 0 && (
              <Box sx={{ mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Assignments
                </Typography>
                <Table size="small" sx={{ minWidth: '100%' }}>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 'bold' }}>Assignment #</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Employee Name</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.assignments.map((assignment, index) => (
                      <>
                        <TableRow key={index}>
                          <TableCell>Assignment {index + 1}</TableCell>
                          <TableCell>{assignment.employeeName || 'Not Assigned'}</TableCell>
                          <TableCell>
                            <Button
                              variant="contained"
                              size="small"
                              onClick={() => {
                                setOpenCloseAssignDialog();
                                setAssignment(row.assignments[index]);
                              }}
                            >
                              Update
                            </Button>
                          </TableCell>
                        </TableRow>
                      </>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            )}

            {/* Payments Table */}
            {row.payments.length > 0 && (
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Payments
                </Typography>
                <Table size="small" sx={{ minWidth: '100%' }}>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 'bold' }}>Payment #</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Amount Paid (USD)</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Remaining Balance (USD)</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}> Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.payments.map((payment, index) => (
                      <>
                        <TableRow key={index}>
                          <TableCell>Payment {index + 1}</TableCell>
                          <TableCell>${payment.amountPaid! + payment.employeeId!}</TableCell>
                          <TableCell>${payment.remainingBalance}</TableCell>
                          <TableCell>
                            <Button
                              variant="contained"
                              size="small"
                              onClick={() => {
                                setOpenClosePaymentDialog();
                                setPayment(row.payments[index]);
                              }}
                            >
                              Update
                            </Button>
                          </TableCell>
                        </TableRow>
                      </>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            )}

            {/* Maintenances Table */}
            {row.maintenances.length > 0 && (
              <Box sx={{ mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                  Maintenance History
                </Typography>
                <Table size="small" sx={{ minWidth: '100%' }}>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 'bold' }}>Maintenance #</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Description</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Paid Amount (USD)</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.maintenances.map((maintenance, index) => (
                      <TableRow key={index}>
                        <TableCell>Maintenance {index + 1}</TableCell>
                        <TableCell>{maintenance.description || 'No Description'}</TableCell>
                        <TableCell>${maintenance.payedAmountInUSD}</TableCell>
                        <TableCell>
                          <Button variant="contained" size="small">
                            Update
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            )}
          </Box>
        </Card>
      </Box>
      {/* End General Information */}
    </>
  );
}
