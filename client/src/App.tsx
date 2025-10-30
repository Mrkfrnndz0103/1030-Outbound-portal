import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeToggle } from "@/components/ThemeToggle";
import { AppSidebar } from "@/components/AppSidebar";
import { AnimatePresence, motion } from "framer-motion";
import NotFound from "@/pages/not-found";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import SubmitReport from "@/pages/SubmitReport";
import PreAlertDatabase from "@/pages/PreAlertDatabase";
import VerificationFlow from "@/pages/VerificationFlow";
import HubEmailList from "@/pages/HubEmailList";

const pageVariants = {
  initial: { opacity: 0, x: -10 },
  enter: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 10 }
};

function Router() {
  return (
    <AnimatePresence mode="wait">
      <Switch>
        <Route path="/login">
          <motion.div
            initial="initial"
            animate="enter"
            exit="exit"
            variants={pageVariants}
            transition={{ duration: 0.3 }}
          >
            <Login />
          </motion.div>
        </Route>
        <Route path="/">
          <motion.div
            initial="initial"
            animate="enter"
            exit="exit"
            variants={pageVariants}
            transition={{ duration: 0.3 }}
          >
            <Dashboard />
          </motion.div>
        </Route>
        <Route path="/submit">
          <motion.div
            initial="initial"
            animate="enter"
            exit="exit"
            variants={pageVariants}
            transition={{ duration: 0.3 }}
          >
            <SubmitReport />
          </motion.div>
        </Route>
        <Route path="/database">
          <motion.div
            initial="initial"
            animate="enter"
            exit="exit"
            variants={pageVariants}
            transition={{ duration: 0.3 }}
          >
            <PreAlertDatabase />
          </motion.div>
        </Route>
        <Route path="/verify">
          <motion.div
            initial="initial"
            animate="enter"
            exit="exit"
            variants={pageVariants}
            transition={{ duration: 0.3 }}
          >
            <VerificationFlow />
          </motion.div>
        </Route>
        <Route path="/hub-emails">
          <motion.div
            initial="initial"
            animate="enter"
            exit="exit"
            variants={pageVariants}
            transition={{ duration: 0.3 }}
          >
            <HubEmailList />
          </motion.div>
        </Route>
        <Route>
          <motion.div
            initial="initial"
            animate="enter"
            exit="exit"
            variants={pageVariants}
            transition={{ duration: 0.3 }}
          >
            <NotFound />
          </motion.div>
        </Route>
      </Switch>
    </AnimatePresence>
  );
}

export default function App() {
  const style = {
    "--sidebar-width": "20rem",
    "--sidebar-width-icon": "4rem",
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <SidebarProvider style={style as React.CSSProperties}>
            <div className="flex h-screen w-full">
              <AppSidebar />
              <div className="flex flex-col flex-1 overflow-hidden">
                <header className="flex items-center justify-between gap-4 px-6 py-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                  <SidebarTrigger data-testid="button-sidebar-toggle" />
                  <div className="flex items-center gap-3">
                    <ThemeToggle />
                  </div>
                </header>
                <main className="flex-1 overflow-auto p-8">
                  <div className="mx-auto max-w-7xl">
                    <Router />
                  </div>
                </main>
              </div>
            </div>
          </SidebarProvider>
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}


