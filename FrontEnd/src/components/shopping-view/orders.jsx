

// import { Card, CardHeader, CardContent, CardTitle } from "../ui/card";
// import {
//   Table,
//   TableBody,
//   TableHead,
//   TableHeader,
//   TableRow,
//   TableCell,
// } from "../ui/table";
// import { Button } from "../ui/button";
// import { Dialog } from "../ui/dialog";
// import ShoppingOrderDetailsView from "./order-details";
// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getAllOrdersByUserId , getOrderDetails, resetOrderDetails} from "@/store/shop/order-slice";
// import { Badge } from "../ui/badge";
// import { motion } from 'framer-motion';

// function ShoppingOrders() {
//   const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

//   const dispatch = useDispatch();
//   const { user } = useSelector((state) => state.auth);
//   const { orderList, orderDetails } = useSelector((state) => state.shopOrder);

//   function handleFetchOrderDetails(getId) {
//     dispatch(getOrderDetails(getId));
//   }

//   useEffect(() => {
//     dispatch(getAllOrdersByUserId(user?.id));
//   }, [dispatch, user]);

//   useEffect(() => {
//     if (orderDetails !== null) setOpenDetailsDialog(true);
//   }, [orderDetails]);

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 10 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//     >
//       <Card className="shadow-lg">
//         <CardHeader>
//           <CardTitle className="text-xl font-semibold">Order History</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <Table className="border rounded-lg">
//             <TableHeader>
//               <TableRow className="bg-gray-100">
//                 <TableHead>Order Id</TableHead>
//                 <TableHead>Order Date</TableHead>
//                 <TableHead>Order Status</TableHead>
//                 <TableHead>Order Price</TableHead>
//                 <TableHead>
//                   <span className="sr-only">Details</span>
//                 </TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {orderList && orderList.length > 0
//                 ? orderList.map((orderItem) => (
//                     <motion.tr
//                       key={orderItem._id}
//                       initial={{ opacity: 0, y: 10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ duration: 0.3 }}
//                       className="hover:bg-gray-50 transition-all"
//                     >
//                       <TableCell>{orderItem?._id}</TableCell>
//                       <TableCell>{orderItem?.orderDate.split("T")[0]}</TableCell>
//                       <TableCell>
//                         <motion.div
//                           initial={{ scale: 0.8 }}
//                           animate={{ scale: 1 }}
//                           transition={{ duration: 0.2 }}
//                         >
//                           <Badge
//                             className={`py-1 px-3 shadow-md rounded-full text-white ${
//                               orderItem?.orderStatus === "confirmed"
//                                 ? "bg-green-500"
//                                 : orderItem?.orderStatus === "rejected"
//                                 ? "bg-red-600"
//                                 : "bg-black"
//                             }`}
//                           >
//                             {orderItem?.orderStatus}
//                           </Badge>
//                         </motion.div>
//                       </TableCell>
//                       <TableCell>₦{orderItem?.totalAmount}</TableCell>
//                       <TableCell>
//                         <Dialog
//                           open={openDetailsDialog}
//                           onOpenChange={() => {
//                             setOpenDetailsDialog(false);
//                             dispatch(resetOrderDetails());
//                           }}
//                         >
//                           <Button
//                             variant="default"
//                             size="sm"
//                             onClick={() => handleFetchOrderDetails(orderItem?._id)}
//                             className="shadow-sm hover:bg-peach-600 transition"
//                           >
//                             View Details
//                           </Button>
//                           <ShoppingOrderDetailsView orderDetails={orderDetails} />
//                         </Dialog>
//                       </TableCell>
//                     </motion.tr>
//                   ))
//                 : <TableRow><TableCell colSpan={5} className="text-center py-4">No orders found.</TableCell></TableRow>}
//             </TableBody>
//           </Table>
//         </CardContent>
//       </Card>
//     </motion.div>
//   );
// }

// export default ShoppingOrders;

import { Card, CardHeader, CardContent, CardTitle } from "../ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "../ui/table";
import { Button } from "../ui/button";
import { Dialog } from "../ui/dialog";
import ShoppingOrderDetailsView from "./order-details";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersByUserId , getOrderDetails, resetOrderDetails} from "@/store/shop/order-slice";
import { Badge } from "../ui/badge";
import { motion } from 'framer-motion';
import { Package, Calendar, Eye, Truck, CheckCircle, Clock, XCircle } from "lucide-react";
import { Link } from "react-router-dom";

function ShoppingOrders() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { orderList, orderDetails } = useSelector((state) => state.shopOrder);

  function handleFetchOrderDetails(getId) {
    dispatch(getOrderDetails(getId));
  }

  useEffect(() => {
    dispatch(getAllOrdersByUserId(user?.id));
  }, [dispatch, user]);

  useEffect(() => {
    if (orderDetails !== null) setOpenDetailsDialog(true);
  }, [orderDetails]);

  const getStatusIcon = (status) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className="h-4 w-4" />;
      case "pending":
        return <Clock className="h-4 w-4" />;
      case "rejected":
        return <XCircle className="h-4 w-4" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

const formatOrderId = (id) => {
  if (!id) return "N/A";
  return `ORD${id.slice(-8).toUpperCase()}`;
};

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {orderList && orderList.length > 0 ? (
        <Card className="shadow-sm border-0">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-semibold flex items-center gap-2">
              <Package className="h-6 w-6 text-peach-500" />
              Your Orders ({orderList.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-hidden rounded-lg border border-gray-200">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50 hover:bg-gray-50">
                    <TableHead className="font-semibold text-gray-900">Order ID</TableHead>
                    <TableHead className="font-semibold text-gray-900">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Date
                      </div>
                    </TableHead>
                    <TableHead className="font-semibold text-gray-900">Status</TableHead>
                    <TableHead className="font-semibold text-gray-900">
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-medium">₦</span>
                        Amount
                      </div>
                    </TableHead>
                    <TableHead className="font-semibold text-gray-900 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orderList.map((orderItem, index) => (
                    <motion.tr
                      key={orderItem._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="hover:bg-gray-50 transition-all border-b border-gray-100 last:border-b-0"
                    >
                      <TableCell className="font-medium text-gray-900">
                        {formatOrderId(orderItem?._id)}
                      </TableCell>
                      <TableCell className="text-gray-600">
                        {orderItem?.orderDate ? new Date(orderItem.orderDate).toLocaleDateString('en-NG') : 'N/A'}
                      </TableCell>
                      <TableCell>
                        <motion.div
                          initial={{ scale: 0.8 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Badge
                            className={`py-2 px-3 rounded-full border ${getStatusColor(orderItem?.orderStatus)}`}
                            variant="outline"
                          >
                            <div className="flex items-center gap-1.5">
                              {getStatusIcon(orderItem?.orderStatus)}
                              <span className="font-medium capitalize">
                                {orderItem?.orderStatus}
                              </span>
                            </div>
                          </Badge>
                        </motion.div>
                      </TableCell>
                      <TableCell className="font-semibold text-gray-900">
                        ₦{orderItem?.totalAmount?.toLocaleString("en-NG")}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end">
                          <Dialog
                            open={openDetailsDialog}
                            onOpenChange={() => {
                              setOpenDetailsDialog(false);
                              dispatch(resetOrderDetails());
                            }}
                          >
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleFetchOrderDetails(orderItem?._id)}
                              className="flex items-center gap-2 hover:bg-peach-50 hover:text-peach-600 hover:border-peach-200 transition-all"
                            >
                              <Eye className="h-4 w-4" />
                              Details
                            </Button>
                            <ShoppingOrderDetailsView orderDetails={orderDetails} />
                          </Dialog>
                        </div>
                      </TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center py-12"
        >
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 max-w-md mx-auto">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Orders Yet</h3>
            <p className="text-gray-600 mb-6">You haven't placed any orders. Start shopping to see your order history here.</p>
            <Button asChild className="bg-peach-500 hover:bg-peach-600 text-white">
              <Link to="/shop/listing">Start Shopping</Link>
            </Button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

export default ShoppingOrders;