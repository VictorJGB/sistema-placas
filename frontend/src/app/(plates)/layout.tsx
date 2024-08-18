'use client';

import Link from 'next/link';

import Header from '@/components/header';

import { useEffect, useState } from 'react';

import { redirect } from 'next/navigation';

import { BellRing, Cpu } from 'lucide-react';

import { Button } from '@/components/ui/button';

import userAlert from '@/functions/user/user-alert';

import showToast from '@/utils/show-toast';
import SensorDialog from '@/components/dialog/sensor';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState(false);
  const [userToken, setUserToken] = useState('');

  // Checando se existe um token
  useEffect(() => {
    setUserToken(sessionStorage.getItem('auth-token') || '');
  }, [userToken]);

  // Função para alertar usuário ao click
  const handleAlert = () => {
    setIsFetching(true);

    // Un-comment for API interactivity
    // userAlert()
    //   .then(() => {
    //     showToast(
    //       'Alerta',
    //       'Inconsistência de dados ou equipamentos foram detectados no sistema!',
    //       true
    //     );
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //     showToast('Erro', 'Ocorreu um erro ao acionar o alerta!', true);
    //   })
    //   .finally(() => {
    //     setIsFetching(false);
    //   });

    // Static toast
      showToast(
          'Alerta',
          'Inconsistência de dados ou equipamentos foram detectados no sistema!',
          true
      );

      setIsFetching(false)
  };

  const handleSensor = () => {
    setIsOpen(true);
  };

  if (userToken === null) {
    console.log(userToken);
    showToast('Erro', 'Usuário não autenticado!', true);
    redirect('/login');
  }

  return (
    <div className="flex flex-col min-w-full min-h-screen">
      <Header />
      <main className="relative flex items-center justify-center min-w-full min-h-screen">
        {children}
        <div className="absolute flex flex-col-reverse items-center justify-center gap-3 bottom-24 left-8">
          <Button
            variant="destructive"
            title="Emitir alerta"
            size="icon"
            className="rounded-full w-14 h-14"
            onClick={handleAlert}
            disabled={isFetching}
          >
            <BellRing />
          </Button>
          <Button
            variant="secondary"
            title="Ir para sensores"
            size="icon"
            className="rounded-full w-14 h-14"
            onClick={handleSensor}
            disabled={isFetching}
          >
            <Cpu />
          </Button>
        </div>
        <SensorDialog
          isOpen={isOpen}
          onOpenChange={setIsOpen}
        />
      </main>
    </div>
  );
}
