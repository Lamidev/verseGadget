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
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../ui/dialog";
// import AdminOrderDetailsView from "./order-details";
// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   getAllOrdersForAdmin,
//   getOrderDetailsForAdmin,
//   resetOrderDetails,
//   deleteOrder,
// } from "@/store/admin/order-slice";
// import { Badge } from "../ui/badge";
// import { motion } from "framer-motion";
// import { useToast } from "@/components/ui/use-toast";

// function AdminOrdersView() {
//   const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
//   const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
//   const [selectedOrderId, setSelectedOrderId] = useState(null);
//   const { orderList, orderDetails } = useSelector((state) => state.adminOrder);
//   const dispatch = useDispatch();
//   const { toast } = useToast();

//   function handleFetchOrderDetails(getId) {
//     dispatch(getOrderDetailsForAdmin(getId));
//   }

//   function handleConfirmDelete(id) {
//     setSelectedOrderId(id);
//     setOpenDeleteDialog(true);
//   }

//   function handleDeleteOrder() {
//     if (!selectedOrderId) return;
//     dispatch(deleteOrder(selectedOrderId))
//       .unwrap()
//       .then((res) => {
//         toast({ title: "Success", description: res.message });
//         dispatch(getAllOrdersForAdmin()); // Refresh orders list
//       })
//       .catch(() => {
//         toast({ title: "Error", description: "Failed to delete order!" });
//       });
//     setOpenDeleteDialog(false);
//     setSelectedOrderId(null);
//   }

//   useEffect(() => {
//     dispatch(getAllOrdersForAdmin());
//   }, [dispatch]);

//   useEffect(() => {
//     if (orderDetails !== null) setOpenDetailsDialog(true);
//   }, [orderDetails]);

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: -10 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.3 }}
//     >
//       <Card>
//         <CardHeader>
//           <CardTitle>All Orders</CardTitle>
//           <CardContent>
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>Order Id</TableHead>
//                   <TableHead>Order Date</TableHead>
//                   <TableHead>Order Status</TableHead>
//                   <TableHead>Order Price</TableHead>
//                   <TableHead>
//                     <span className="sr-only">Actions</span>
//                   </TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {orderList && orderList.length > 0
//                   ? orderList.map((orderItem) => (
//                       <motion.tr
//                         key={orderItem?._id}
//                         initial={{ opacity: 0, scale: 0.95 }}
//                         animate={{ opacity: 1, scale: 1 }}
//                         transition={{ duration: 0.2 }}
//                       >
//                         <TableCell>{orderItem?._id}</TableCell>
//                         <TableCell>
//                           {orderItem?.orderDate.split("T")[0]}
//                         </TableCell>
//                         <TableCell>
//                           <Badge
//                             className={`py-1 px-3 ${
//                               orderItem?.orderStatus === "confirmed"
//                                 ? "bg-green-500"
//                                 : orderItem?.orderStatus === "rejected"
//                                 ? "bg-red-600"
//                                 : "bg-black"
//                             }`}
//                           >
//                             {orderItem?.orderStatus}
//                           </Badge>
//                         </TableCell>
//                         <TableCell>₦{orderItem?.totalAmount}</TableCell>
//                         <TableCell>
//                           <Dialog
//                             open={openDetailsDialog}
//                             onOpenChange={() => {
//                               setOpenDetailsDialog(false);
//                               dispatch(resetOrderDetails());
//                             }}
//                           >
//                             <Button
//                               onClick={() =>
//                                 handleFetchOrderDetails(orderItem?._id)
//                               }
//                               className="px-2 py-1 text-sm font-medium"
//                             >
//                               View Details
//                             </Button>
//                             <AdminOrderDetailsView orderDetails={orderDetails} />
//                           </Dialog>
//                           <Button
//                             onClick={() => handleConfirmDelete(orderItem?._id)}
//                             className="px-2 py-1 text-sm font-medium bg-red-600 hover:bg-red-700 ml-2"
//                           >
//                             Delete
//                           </Button>
//                         </TableCell>
//                       </motion.tr>
//                     ))
//                   : null}
//               </TableBody>
//             </Table>
//           </CardContent>
//         </CardHeader>
//       </Card>

//       {/* Delete Confirmation Dialog */}
//       <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Confirm Deletion</DialogTitle>
//           </DialogHeader>
//           <p>Are you sure you want to delete this order? This action cannot be undone.</p>
//           <DialogFooter>
//             <Button variant="ghost" onClick={() => setOpenDeleteDialog(false)}>
//               Cancel
//             </Button>
//             <Button className="bg-red-600 hover:bg-red-700" onClick={handleDeleteOrder}>
//               Confirm Delete
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </motion.div>
//   );
// }

// export default AdminOrdersView;


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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../ui/dialog";
import AdminOrderDetailsView from "./order-details";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrdersForAdmin,
  getOrderDetailsForAdmin,
  resetOrderDetails,
  deleteOrder,
} from "@/store/admin/order-slice";
import { Badge } from "../ui/badge";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";
import { Package, Calendar, Eye, Trash2, Users, Search, RefreshCw } from "lucide-react";
import { Input } from "../ui/input";

function AdminOrdersView() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const { orderList, orderDetails, isLoading } = useSelector((state) => state.adminOrder);
  const dispatch = useDispatch();
  const { toast } = useToast();

  function handleFetchOrderDetails(getId) {
    dispatch(getOrderDetailsForAdmin(getId));
  }

  function handleConfirmDelete(id) {
    setSelectedOrderId(id);
    setOpenDeleteDialog(true);
  }

  function handleDeleteOrder() {
    if (!selectedOrderId) return;
    dispatch(deleteOrder(selectedOrderId))
      .unwrap()
      .then((res) => {
        toast({ 
          title: "Success", 
          description: res.message,
          variant: "default"
        });
        dispatch(getAllOrdersForAdmin());
      })
      .catch(() => {
        toast({ 
          title: "Error", 
          description: "Failed to delete order!",
          variant: "destructive"
        });
      });
    setOpenDeleteDialog(false);
    setSelectedOrderId(null);
  }

  function handleRefreshOrders() {
    dispatch(getAllOrdersForAdmin());
    toast({
      title: "Refreshed",
      description: "Order list updated successfully",
    });
  }

  useEffect(() => {
    dispatch(getAllOrdersForAdmin());
  }, [dispatch]);

  useEffect(() => {
    if (orderDetails !== null) setOpenDetailsDialog(true);
  }, [orderDetails]);

 const formatOrderId = (id) => {
  if (!id) return "N/A";
  return `ORD${id.slice(-8).toUpperCase()}`;
};

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
      case "delivered":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200";
      case "in process":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "inShipping":
        return "bg-purple-100 text-purple-800 border-purple-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "confirmed":
        return "✅";
      case "delivered":
        return "📦";
      case "pending":
        return "⏳";
      case "rejected":
        return "❌";
      case "in process":
        return "🔧";
      case "inShipping":
        return "🚚";
      default:
        return "📋";
    }
  };

  const filteredOrders = orderList?.filter(order => {
    const matchesSearch = order?._id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order?.addressInfo?.fullName?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || order?.orderStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusCounts = orderList?.reduce((acc, order) => {
    acc[order.orderStatus] = (acc[order.orderStatus] || 0) + 1;
    acc.total = (acc.total || 0) + 1;
    return acc;
  }, {});

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Total Orders</p>
                <p className="text-2xl font-bold">{statusCounts?.total || 0}</p>
              </div>
              <Package className="h-8 w-8 opacity-80" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">Confirmed</p>
                <p className="text-2xl font-bold">{statusCounts?.confirmed || 0}</p>
              </div>
              <Users className="h-8 w-8 opacity-80" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">Delivered</p>
                <p className="text-2xl font-bold">{statusCounts?.delivered || 0}</p>
              </div>
              <Package className="h-8 w-8 opacity-80" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Controls Card */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Package className="h-6 w-6 text-blue-600" />
                Order Management
              </CardTitle>
              <p className="text-gray-600 mt-1">Manage and track all customer orders</p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                onClick={handleRefreshOrders}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
                disabled={isLoading}
              >
                <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filters and Search */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search orders by ID or customer name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="in process">In Process</option>
              <option value="inShipping">In Shipping</option>
              <option value="delivered">Delivered</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          {/* Orders Table */}
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50 hover:bg-gray-50">
                  <TableHead className="font-semibold">Order ID</TableHead>
                  <TableHead className="font-semibold">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Date
                    </div>
                  </TableHead>
                  <TableHead className="font-semibold">Customer</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold">
                    <div className="flex items-center gap-1">
                      <span className="text-sm">₦</span>
                      Amount
                    </div>
                  </TableHead>
                  <TableHead className="font-semibold text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders && filteredOrders.length > 0 ? (
                  filteredOrders.map((orderItem, index) => (
                    <motion.tr
                      key={orderItem?._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="hover:bg-gray-50 transition-all border-b border-gray-100 last:border-b-0"
                    >
                      <TableCell className="font-mono text-sm font-medium">
                        {formatOrderId(orderItem?._id)}
                      </TableCell>
                      <TableCell className="text-gray-600">
                        {orderItem?.orderDate ? new Date(orderItem.orderDate).toLocaleDateString('en-NG') : 'N/A'}
                      </TableCell>
                      <TableCell className="font-medium">
                        {orderItem?.addressInfo?.fullName || 'N/A'}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={`py-2 px-3 rounded-full border ${getStatusColor(orderItem?.orderStatus)}`}
                          variant="outline"
                        >
                          <div className="flex items-center gap-1.5">
                            <span>{getStatusIcon(orderItem?.orderStatus)}</span>
                            <span className="font-medium capitalize">
                              {orderItem?.orderStatus}
                            </span>
                          </div>
                        </Badge>
                      </TableCell>
                      <TableCell className="font-semibold">
                        ₦{orderItem?.totalAmount?.toLocaleString("en-NG")}
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-end gap-2">
                          <Dialog
                            open={openDetailsDialog}
                            onOpenChange={() => {
                              setOpenDetailsDialog(false);
                              dispatch(resetOrderDetails());
                            }}
                          >
                            <Button
                              onClick={() => handleFetchOrderDetails(orderItem?._id)}
                              variant="outline"
                              size="sm"
                              className="flex items-center gap-2 hover:bg-blue-50 hover:text-blue-600"
                            >
                              <Eye className="h-4 w-4" />
                              View
                            </Button>
                            <AdminOrderDetailsView orderDetails={orderDetails} />
                          </Dialog>
                          <Button
                            onClick={() => handleConfirmDelete(orderItem?._id)}
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-2 hover:bg-red-50 hover:text-red-600 border-red-200 text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </motion.tr>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      <div className="flex flex-col items-center justify-center text-gray-500">
                        <Package className="h-12 w-12 mb-4 text-gray-300" />
                        <p className="text-lg font-semibold mb-2">No orders found</p>
                        <p className="text-sm">
                          {searchTerm || statusFilter !== "all" 
                            ? "Try adjusting your search or filters" 
                            : "No orders have been placed yet"}
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Summary */}
          {filteredOrders && filteredOrders.length > 0 && (
            <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
              <span>Showing {filteredOrders.length} of {orderList?.length} orders</span>
              {searchTerm && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSearchTerm("")}
                  className="text-blue-600 hover:text-blue-700"
                >
                  Clear search
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <Trash2 className="h-5 w-5" />
              Confirm Order Deletion
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-gray-600">
              Are you sure you want to delete this order? This action cannot be undone and will permanently remove the order from the system.
            </p>
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-sm text-red-800 font-medium">
                Order: {formatOrderId(selectedOrderId)}
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenDeleteDialog(false)}>
              Cancel
            </Button>
            <Button 
              className="bg-red-600 hover:bg-red-700 text-white" 
              onClick={handleDeleteOrder}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Order
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}

export default AdminOrdersView;