// import { Link } from "react-router-dom";
// import { Button } from "./ui/button"; // Your custom button
// import { useWallet, useConnection } from "@solana/wallet-adapter-react";
// // Import the hook to control the modal visibility
// import { useWalletModal } from "@solana/wallet-adapter-react-ui"; 
// import { useTheme } from "./theme-provider";
// import { shortenAddress } from "../lib/utils";
// import { useCallback } from "react"; // Import useCallback

// export default function Navbar() {
//   const { connected, publicKey, wallet, disconnect } = useWallet();
//   // Get the modal state and setter
//   const { visible, setVisible } = useWalletModal(); 

//   // Function to open the wallet modal
//   const handleConnectClick = useCallback(() => {
//     setVisible(true);
//   }, [setVisible]);

//   // Function to disconnect the wallet
//   const handleDisconnectClick = useCallback(() => {
//     disconnect();
//   }, [disconnect]);

//   return (
//     <header className="border-b border-[#2A2A4A] bg-[#0F0F1A]/80 backdrop-blur-md sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-16 items-center">
//           <div className="flex items-center">
//             <Link to="/" className="flex items-center">
//               <span className="text-2xl font-bold gradient-text">WALTH</span> 
//             </Link>
//           </div>
//           <div className="flex items-center gap-4">
//             {/* "View My Health" button */}
//             {connected && publicKey && (
//               <Link to={`/analysis/address/${publicKey.toBase58()}`}>
//                 <Button 
//                   variant="outline" 
//                   className="border-[#9945FF] text-[#9945FF] hover:bg-[#9945FF] hover:text-white transition-all duration-300 mr-2"
//                 >
//                   View My Health
//                 </Button>
//               </Link>
//             )}

//             {/* Custom Wallet Connect/Disconnect Button */}
//             <Button
//               onClick={connected ? handleDisconnectClick : handleConnectClick}
//               // Apply the primary button styles from your UI kit directly
//               className="bg-[#9945FF] text-white font-medium rounded-lg px-4 py-2 text-sm hover:bg-opacity-90 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#9945FF]/50"
//             >
//               {connected && publicKey ? shortenAddress(publicKey.toBase58()) : 'Connect Wallet'}
//             </Button>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }

// import { Link } from "react-router-dom";
// import { Button } from "./ui/button";
// import { useWallet } from "@solana/wallet-adapter-react";
// import { useWalletModal } from "@solana/wallet-adapter-react-ui"; 
// import { shortenAddress } from "../lib/utils";
// import { useCallback, useState } from "react";
// import { Menu, X } from "lucide-react";

// export default function Navbar() {
//   const { connected, publicKey, disconnect } = useWallet();
//   const { setVisible } = useWalletModal();
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   const handleConnectClick = useCallback(() => {
//     setVisible(true);
//     setMobileMenuOpen(false);
//   }, [setVisible]);

//   const handleDisconnectClick = useCallback(() => {
//     disconnect();
//     setMobileMenuOpen(false);
//   }, [disconnect]);

//   return (
//     <header className="border-b border-[#2A2A4A] bg-[#0F0F1A]/80 backdrop-blur-md sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-16 items-center">
//           {/* Logo - more spacing on mobile */}
//           <div className="flex-shrink-0 mr-auto">
//             <Link to="/" className="flex items-center">
//               <span className="text-xl sm:text-2xl font-bold gradient-text">WALTH</span> 
//             </Link>
//           </div>
          
//           {/* Desktop navigation with consistent button styling */}
//           <div className="hidden md:flex items-center gap-3">
//             {connected && publicKey && (
//               <Link to={`/analysis/address/${publicKey.toBase58()}`}>
//                 <Button 
//                   size="default"
//                   className="bg-[#9945FF]/10 border border-[#9945FF]/30 text-[#9945FF] hover:bg-[#9945FF] hover:text-white px-4 py-2 h-9 rounded-lg transition-all duration-200"
//                 >
//                   View My Health
//                 </Button>
//               </Link>
//             )}

//             <Button
//               onClick={connected ? handleDisconnectClick : handleConnectClick}
//               className="bg-[#9945FF] text-white font-medium rounded-lg px-4 py-2 h-9 hover:bg-opacity-90 transition-all duration-200"
//             >
//               {connected && publicKey ? shortenAddress(publicKey.toBase58()) : 'Connect Wallet'}
//             </Button>
//           </div>
          
//           {/* Mobile menu button - positioned properly */}
//           <div className="md:hidden ml-4">
//             <button
//               type="button"
//               className="p-2 rounded-md text-white hover:bg-[#2A2A4A]/30 transition-colors"
//               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//             >
//               {mobileMenuOpen ? (
//                 <X className="h-5 w-5" aria-hidden="true" />
//               ) : (
//                 <Menu className="h-5 w-5" aria-hidden="true" />
//               )}
//             </button>
//           </div>
//         </div>
//       </div>
      
//       {/* Mobile menu with consistent styling */}
//       {mobileMenuOpen && (
//         <div className="md:hidden border-t border-[#2A2A4A] px-4 py-3 space-y-3">
//           {connected && publicKey && (
//             <Link 
//               to={`/analysis/address/${publicKey.toBase58()}`}
//               onClick={() => setMobileMenuOpen(false)}
//               className="block w-full"
//             >
//               <Button 
//                 className="bg-[#9945FF]/10 border border-[#9945FF]/30 text-[#9945FF] hover:bg-[#9945FF] hover:text-white w-full h-9 text-sm font-medium transition-all duration-200"
//               >
//                 View My Health
//               </Button>
//             </Link>
//           )}
          
//           <Button
//             onClick={connected ? handleDisconnectClick : handleConnectClick}
//             className="bg-[#9945FF] text-white w-full h-9 text-sm font-medium rounded-lg hover:bg-opacity-90 transition-all duration-200"
//           >
//             {connected && publicKey ? shortenAddress(publicKey.toBase58()) : 'Connect Wallet'}
//           </Button>
//         </div>
//       )}
//     </header>
//   );
// }

import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui"; 
import { shortenAddress } from "../lib/utils";
import { useCallback, useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const { connected, publicKey, disconnect } = useWallet();
  const { setVisible } = useWalletModal();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  

  const handleConnectClick = useCallback(() => {
    setVisible(true);
    setMobileMenuOpen(false);
  }, [setVisible]);

  const handleDisconnectClick = useCallback(() => {
    disconnect();
    setMobileMenuOpen(false);
  }, [disconnect]);

  return (
    <header className="border-b border-[#2A2A4A]/40 bg-[#0F0F1A]/60 backdrop-blur-md sticky top-0 z-50 glass-navbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 mr-auto">
            <Link to="/" className="flex items-center">
              <span className="text-xl sm:text-2xl font-bold gradient-text">WALTH</span> 
            </Link>
          </div>
          
          {/* Desktop navigation */}
          <div className="hidden md:flex items-center gap-3">
            {connected && publicKey && (
              <Link to={`/analysis/address/${publicKey.toBase58()}`}>
                <Button 
                  size="default"
                  className="bg-[#9945FF]/10 border border-[#9945FF]/30 text-[#9945FF] hover:bg-[#9945FF] hover:text-white px-4 py-2 h-9 rounded-lg transition-all duration-200"
                >
                  View My Health
                </Button>
              </Link>
            )}

            <Button
              onClick={connected ? handleDisconnectClick : handleConnectClick}
              className="bg-[#9945FF] text-white font-medium rounded-lg px-4 py-2 h-9 hover:bg-opacity-90 transition-all duration-200"
            >
              {connected && publicKey ? shortenAddress(publicKey.toBase58()) : 'Connect Wallet'}
            </Button>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden ml-4">
            <button
              type="button"
              className="p-2 rounded-md text-white hover:bg-[#2A2A4A]/30 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu with glass effect */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#2A2A4A]/40 bg-[#0F0F1A]/70 backdrop-blur-md px-4 py-3 space-y-3">
          {connected && publicKey && (
            <Link 
              to={`/analysis/address/${publicKey.toBase58()}`}
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full"
            >
              <Button 
                className="bg-[#9945FF]/10 border border-[#9945FF]/30 text-[#9945FF] hover:bg-[#9945FF] hover:text-white w-full h-9 text-sm font-medium transition-all duration-200"
              >
                View My Health
              </Button>
            </Link>
          )}
          
          <Button
            onClick={connected ? handleDisconnectClick : handleConnectClick}
            className="bg-[#9945FF] text-white w-full h-9 text-sm font-medium rounded-lg hover:bg-opacity-90 transition-all duration-200"
          >
            {connected && publicKey ? shortenAddress(publicKey.toBase58()) : 'Connect Wallet'}
          </Button>
        </div>
      )}
    </header>
  );
}