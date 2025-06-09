import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { getToken } from "@/service/auth";

export function TestDataUploader() {
  const { toast } = useToast();

  const handleUpload = async () => {
    try {
      const token = getToken();
      const response = await fetch("/api/test-data/upload", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to upload test data");
      }

      toast({
        title: "Success",
        description: "Test data uploaded successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload test data",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Test Data</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          Upload test data to populate the dashboard with sample information.
          This will create a test restaurant, supplier, products, dishes, and sales.
        </p>
        <Button onClick={handleUpload}>
          Upload Test Data
        </Button>
      </CardContent>
    </Card>
  );
} 