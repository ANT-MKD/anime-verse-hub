import { ReactNode, useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import AdminSidebar from './AdminSidebar';
import { useUserProfile } from '@/contexts/UserProfileContext';

interface AdminLayoutProps {
  children: ReactNode;
  title: string;
  description?: string;
}

const AdminLayout = ({ children, title, description }: AdminLayoutProps) => {
  const { isProfileSet } = useUserProfile();
  const [sidebarWidth, setSidebarWidth] = useState(280);

  // Listen for sidebar collapse
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const sidebar = document.querySelector('aside');
      if (sidebar) {
        setSidebarWidth(sidebar.offsetWidth);
      }
    });

    const sidebar = document.querySelector('aside');
    if (sidebar) {
      observer.observe(sidebar, { attributes: true, attributeFilter: ['style'] });
      setSidebarWidth(sidebar.offsetWidth);
    }

    return () => observer.disconnect();
  }, []);

  // For demo purposes, we allow access without profile
  // In production, you would check for admin role

  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar />
      
      <motion.main
        animate={{ marginLeft: sidebarWidth }}
        transition={{ duration: 0.3 }}
        className="min-h-screen"
      >
        {/* Header */}
        <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border">
          <div className="px-6 py-4">
            <h1 className="font-display text-2xl font-bold">{title}</h1>
            {description && (
              <p className="text-sm text-muted-foreground mt-1">{description}</p>
            )}
          </div>
        </header>

        {/* Content */}
        <div className="p-6">
          {children}
        </div>
      </motion.main>
    </div>
  );
};

export default AdminLayout;
