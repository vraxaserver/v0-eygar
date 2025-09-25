import React from "react";
import Icon from "@/components/AppIcon";

const MetricsCard = ({
    title,
    value,
    change,
    changeType,
    icon,
    color = "primary",
}) => {
    const getColorClasses = (colorType) => {
        switch (colorType) {
            case "success":
                return "bg-success/10 text-success border-success/20";
            case "warning":
                return "bg-warning/10 text-warning border-warning/20";
            case "error":
                return "bg-error/10 text-error border-error/20";
            case "accent":
                return "bg-accent/10 text-accent border-accent/20";
            default:
                return "bg-primary/10 text-primary border-primary/20";
        }
    };

    const getChangeColor = (type) => {
        switch (type) {
            case "positive":
                return "text-success";
            case "negative":
                return "text-error";
            default:
                return "text-muted-foreground";
        }
    };

    return (
        <div className="bg-card border border-border rounded-lg p-6 shadow-elevation-1 hover-scale transition-smooth">
            <div className="flex items-center justify-between">
                <div className="flex-1">
                    <p className="text-sm font-medium text-muted-foreground mb-1">
                        {title}
                    </p>
                    <p className="text-2xl font-bold text-foreground">
                        {value}
                    </p>
                    {change && (
                        <div className="flex items-center mt-2">
                            <Icon
                                name={
                                    changeType === "positive"
                                        ? "TrendingUp"
                                        : changeType === "negative"
                                        ? "TrendingDown"
                                        : "Minus"
                                }
                                size={16}
                                className={`mr-1 ${getChangeColor(changeType)}`}
                            />
                            <span
                                className={`text-sm font-medium ${getChangeColor(
                                    changeType
                                )}`}
                            >
                                {change}
                            </span>
                        </div>
                    )}
                </div>
                <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center ${getColorClasses(
                        color
                    )}`}
                >
                    <Icon name={icon} size={24} />
                </div>
            </div>
        </div>
    );
};

export default MetricsCard;
