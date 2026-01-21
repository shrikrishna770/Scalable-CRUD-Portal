import React from 'react';
import { cn } from '@/lib/utils';

export const Input = React.forwardRef(
    ({ className, label, error, icon, ...props }, ref) => {
        return (
            <div className="w-full space-y-1.5">
                {label && (
                    <label className="text-sm font-bold text-slate-900 ml-1">
                        {label}
                    </label>
                )}
                <div className="relative">
                    {icon && (
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                            {React.cloneElement(icon, { className: 'w-5 h-5' })}
                        </div>
                    )}
                    <input
                        ref={ref}
                        className={cn(
                            'w-full py-3 bg-white border-2 border-slate-100 rounded-xl outline-none transition-all duration-200 focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 placeholder:text-slate-400 text-slate-900 font-medium',
                            icon ? 'pl-12 pr-4' : 'px-4',
                            error && 'border-red-400 focus:border-red-400 focus:ring-red-500/10',
                            className
                        )}
                        {...props}
                    />
                </div>
                {error && <p className="text-xs font-medium text-red-500 ml-1">{error}</p>}
            </div>
        );
    }
);

Input.displayName = 'Input';
