"use client";

import Link from "next/link";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { Address } from "~~/components/scaffold-eth";

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();

  return (
    <div className="flex items-center flex-col flex-grow pt-10 bg-gradient-to-r from-blue-800 to-white text-white min-h-screen">
      <div className="px-5 text-center bg-white text-black p-10 rounded-xl shadow-lg">
        <h1 className="text-5xl font-bold mb-4"> ¿Dónde está Mateo? 🕵️‍♂️ </h1>
        <p className="text-lg mb-6">
          Ayúdanos a encontrar a Mateo completando las funciones de los contratos inteligentes, generando su retrato
          hablado y creando un NFT en la red de prueba Sepolia.
        </p>
        <div className="flex justify-center items-center space-x-2 mb-6">
          <p className="font-medium">Dirección Conectada:</p>
          <Address address={connectedAddress} />
        </div>
        <Link href="/mint" passHref legacyBehavior>
          <a className="bg-blue-500 text-white py-3 px-6 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 ease-in-out transform hover:scale-105">
            Ir a Generar Retrato
          </a>
        </Link>
        <div className="h-7"></div>
        <Link href="/gallery" passHref legacyBehavior>
          <a className="bg-green-500 text-white py-3 px-6 rounded-full hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300 ease-in-out transform hover:scale-105">
            Ir a Listado de Retratos
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Home;
