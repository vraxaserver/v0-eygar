import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {getStatusColor} from "@/lib/utils"

import {
    Star,
    Eye,
    Edit,
    Trash2,
    Plus,
    MapPin
} from "lucide-react";

const TabMyProperty = ({properties, setShowAddModal}) => {

    return (
        <>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
                <h2 className="text-xl font-semibold">Your Properties</h2>
                <Button onClick={setShowAddModal} className="bg-purple-500 hover:bg-purple-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Add New Property
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties.map((property) => (
                    <Card
                        key={property.id}
                        className="group hover:shadow-lg transition-all"
                    >
                        <CardContent className="p-0">
                            <div className="relative">
                                <img
                                    src={property.image}
                                    alt={property.title}
                                    className="w-full h-48 object-cover rounded-t-lg"
                                />
                                <Badge
                                    className={`absolute top-3 left-3 ${getStatusColor(
                                        property.status
                                    )}`}
                                >
                                    {property.status}
                                </Badge>
                                <div className="absolute top-3 right-3 flex space-x-1">
                                    <Button
                                        variant="secondary"
                                        size="sm"
                                        className="w-8 h-8 p-0"
                                    >
                                        <Eye className="w-4 h-4" />
                                    </Button>
                                    <Button
                                        variant="secondary"
                                        size="sm"
                                        className="w-8 h-8 p-0"
                                    >
                                        <Edit className="w-4 h-4" />
                                    </Button>
                                    <Button
                                        variant="secondary"
                                        size="sm"
                                        className="w-8 h-8 p-0 text-red-600"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                            <div className="p-4">
                                <h3 className="font-semibold text-gray-900 mb-1 truncate">
                                    {property.title}
                                </h3>
                                <p className="text-sm text-gray-600 mb-2 flex items-center">
                                    <MapPin className="w-3 h-3 mr-1" />
                                    {property.location}
                                </p>
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center space-x-1">
                                        <Star className="w-4 h-4 fill-current text-yellow-500" />
                                        <span className="text-sm font-medium">
                                            {property.rating}
                                        </span>
                                        <span className="text-sm text-gray-500">
                                            ({property.reviews})
                                        </span>
                                    </div>
                                    <div className="text-sm font-semibold">
                                        ${property.price}/night
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4 text-xs text-gray-600">
                                    <div>
                                        <div className="font-medium">
                                            {property.bookings} bookings
                                        </div>
                                        <div>This month</div>
                                    </div>
                                    <div>
                                        <div className="font-medium">
                                            {property.earnings}
                                        </div>
                                        <div>Total earnings</div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </>
    );
};

export default TabMyProperty;
