import { Alert, AlertDescription, AlertCircle, CheckCircle2 } from "lucide-react";
import { Alert as AlertComponent } from "@/components/ui/alert";
import { useAccount, useChainId } from "wagmi";

interface ContractStatusProps {
  contractAddress: string | undefined;
  message: string | undefined;
  isLoading: boolean;
}

export const ContractStatus = ({ contractAddress, message, isLoading }: ContractStatusProps) => {
  const { isConnected } = useAccount();
  const chainId = useChainId();

  if (!isConnected) {
    return null;
  }

  if (!contractAddress) {
    return (
      <AlertComponent className="mb-6 border-destructive">
        <AlertCircle className="h-4 w-4 text-destructive" />
        <AlertDescription>
          <div className="space-y-2">
            <p className="font-semibold">Contract address not configured</p>
            <p className="text-sm">
              Please set VITE_CONTRACT_ADDRESS in your environment variables.
            </p>
            <p className="text-xs text-muted-foreground">
              Current chain ID: {chainId} | Expected: 31337 (localhost)
            </p>
            <p className="text-xs text-muted-foreground">
              Environment variable value: {import.meta.env.VITE_CONTRACT_ADDRESS || "undefined"}
            </p>
          </div>
        </AlertDescription>
      </AlertComponent>
    );
  }

  if (isLoading) {
    return (
      <AlertComponent className="mb-6">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          <div className="space-y-1">
            <p>Connecting to contract...</p>
            <p className="text-xs text-muted-foreground">Contract: {contractAddress}</p>
            <p className="text-xs text-muted-foreground">Chain ID: {chainId}</p>
          </div>
        </AlertDescription>
      </AlertComponent>
    );
  }

  if (message) {
    const isError = message.toLowerCase().includes("error") || 
                   message.toLowerCase().includes("not deployed") ||
                   message.toLowerCase().includes("failed");
    
    return (
      <AlertComponent className={`mb-6 ${isError ? "border-destructive" : ""}`}>
        {isError ? (
          <AlertCircle className="h-4 w-4 text-destructive" />
        ) : (
          <CheckCircle2 className="h-4 w-4" />
        )}
        <AlertDescription>
          <div className="space-y-1">
            <p className={isError ? "font-semibold text-destructive" : ""}>{message}</p>
            <p className="text-xs text-muted-foreground">Contract: {contractAddress}</p>
            <p className="text-xs text-muted-foreground">Chain ID: {chainId}</p>
          </div>
        </AlertDescription>
      </AlertComponent>
    );
  }

  return (
    <AlertComponent className="mb-6 border-green-500/20 bg-green-500/5">
      <CheckCircle2 className="h-4 w-4 text-green-500" />
      <AlertDescription>
        <div className="space-y-1">
          <p className="font-semibold text-green-500">Contract connected successfully</p>
          <p className="text-xs text-muted-foreground">Contract: {contractAddress}</p>
          <p className="text-xs text-muted-foreground">Chain ID: {chainId}</p>
        </div>
      </AlertDescription>
    </AlertComponent>
  );
};

