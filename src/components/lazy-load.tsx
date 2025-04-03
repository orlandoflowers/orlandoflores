import { Suspense, lazy, ComponentType } from 'react';

interface LazyProps {
  component: () => Promise<{ default: ComponentType<any> }>;
  fallback?: React.ReactNode;
  props?: Record<string, any>;
}

export function Lazy({ component, fallback = null, props = {} }: LazyProps) {
  const LazyComponent = lazy(component);
  
  return (
    <Suspense fallback={fallback}>
      <LazyComponent {...props} />
    </Suspense>
  );
} 