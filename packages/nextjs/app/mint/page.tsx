"use client";

import { useCallback, useEffect, useState } from "react";
import type { NextPage } from "next";
import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

const attributes = {
  accessoriesType: ["Ninguna", "Vintage", "Formuladas 1", "Formuladas 2", "Redondas", "Gafas de sol", "Wayfarers"],
  clotheColor: [
    "Negro",
    "Azul01",
    "Azul02",
    "Azul03",
    "Gris01",
    "Gris02",
    "Mezclilla",
    "Azul pastel",
    "Verde pastel",
    "Naranja pastel",
    "Rojo pastel",
    "Amarillo pastel",
    "Rosa",
    "Rojo",
    "Blanco",
  ],
  clotheType: [
    "Blazer con camisa",
    "Blazer con suéter",
    "Suéter con cuello",
    "Camiseta gráfica",
    "Sudadera",
    "Overol",
    "Camiseta cuello redondo",
    "Camiseta cuello en V",
  ],
  eyeType: [
    "Cerrado",
    "Llorando",
    "Normal",
    "Mareado",
    "Ojo girando",
    "Feliz",
    "Corazones",
    "De lado",
    "Entrecerrar",
    "Sorprendido",
    "Guiño",
    "Guiño loco",
  ],
  eyebrowType: [
    "Enojado",
    "Enojado natural",
    "Normal",
    "Normal natural",
    "Plano natural",
    "Emocionado",
    "Emocionado natural",
    "Preocupado",
    "Preocupado natural",
    "Uniceja",
    "Arriba y abajo",
    "Arriba y abajo natural",
  ],
  facialHairColor: ["Caoba", "Negro", "Rubio", "Rubio dorado", "Castaño", "Castaño oscuro", "Platino", "Rojo"],
  facialHairType: ["Ninguno", "Barba mediana", "Barba ligera", "Barba majestuosa", "Bigote elegante", "Bigote Magnum"],
  hairColor: [
    "Caoba",
    "Negro",
    "Rubio",
    "Rubio dorado",
    "Castaño",
    "Castaño oscuro",
    "Rosa pastel",
    "Platino",
    "Rojo",
    "Gris plateado",
  ],
  hatColor: [
    "Negro",
    "Azul01",
    "Azul02",
    "Azul03",
    "Gris01",
    "Gris02",
    "Mezclilla",
    "Azul pastel",
    "Verde pastel",
    "Naranja pastel",
    "Rojo pastel",
    "Amarillo pastel",
    "Rosa",
    "Rojo",
    "Blanco",
  ],
  graphicType: [
    "Murciélago",
    "Cumbia",
    "Ciervo",
    "Diamante",
    "Hola",
    "Pizza",
    "Resistir",
    "Selena",
    "Oso",
    "Calavera contorno",
    "Calavera",
  ],
  mouthType: [
    "Preocupado",
    "Normal",
    "Incredulidad",
    "Comiendo",
    "Grimace",
    "Triste",
    "Gritando",
    "Serio",
    "Sonrisa",
    "Lengua",
    "Brillo",
    "Vómito",
  ],
  skinColor: ["Bronceado", "Amarillo", "Pálido", "Claro", "Castaño", "Castaño oscuro", "Negro"],
  topType: [
    "Sin pelo",
    "Parche en el ojo",
    "Sombrero",
    "Hiyab",
    "Turbante",
    "Gorro de invierno 1",
    "Gorro de invierno 2",
    "Gorro de invierno 3",
    "Gorro de invierno 4",
    "Pelo largo y grande",
    "Pelo largo Bob",
    "Pelo largo en moño",
    "Pelo largo rizado",
    "Pelo largo curvo",
    "Pelo largo rastas",
    "Pelo largo Frida",
    "Pelo largo afro",
    "Pelo largo con cinta",
    "Pelo largo no muy largo",
    "Pelo largo con lados afeitados",
    "Pelo largo Mia Wallace",
    "Pelo largo liso",
    "Pelo largo liso 2",
    "Pelo largo liso mechón",
    "Pelo corto rastas 1",
    "Pelo corto rastas 2",
    "Pelo corto frizzle",
    "Pelo corto shaggy mullet",
    "Pelo corto rizado",
    "Pelo corto plano",
    "Pelo corto redondo",
    "Pelo corto ondulado",
    "Pelo corto con lados",
    "Pelo corto César",
    "Pelo corto César con parte lateral",
  ],
};

const translations = {
  accessoriesType: "Tipo de gafas 👓",
  clotheColor: "Color de ropa 👗",
  clotheType: "Tipo de ropa 👕",
  eyeType: "Tipo de ojos 👀",
  eyebrowType: "Tipo de cejas 🤨",
  facialHairColor: "Color de barba 🧔",
  facialHairType: "Tipo de barba 🧔",
  hairColor: "Color de pelo 🧑‍🦰",
  hatColor: "Color de sombrero 🎩",
  graphicType: "Tipo de gráfico 🎨",
  mouthType: "Tipo de boca 👄",
  skinColor: "Color de piel 🧑‍🦱",
  topType: "Tipo de peinado 💇‍♂️",
};

const usePreviewImage = (
  attributesArray: readonly [
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
  ],
) => {
  const { data: previewImage, isLoading } = useScaffoldReadContract({
    contractName: "GenesisToken",
    functionName: "previewImage",
    args: [attributesArray],
  });

  return { previewImage, isLoading };
};

const Home: NextPage = () => {
  const { writeContractAsync, isPending } = useScaffoldWriteContract("GenesisToken");

  const [selectedAttributes, setSelectedAttributes] = useState({
    accessoriesType: 0,
    clotheColor: 0,
    clotheType: 0,
    eyeType: 0,
    eyebrowType: 0,
    facialHairColor: 0,
    facialHairType: 0,
    hairColor: 0,
    hatColor: 0,
    graphicType: 0,
    mouthType: 0,
    skinColor: 0,
    topType: 0,
  });

  const [attributesArray, setAttributesArray] = useState<
    | readonly [number, number, number, number, number, number, number, number, number, number, number, number, number]
    | null
  >(null);

  const updateAttributesArray = useCallback(() => {
    const newAttributesArray: [
      number,
      number,
      number,
      number,
      number,
      number,
      number,
      number,
      number,
      number,
      number,
      number,
      number,
    ] = [
      selectedAttributes.accessoriesType,
      selectedAttributes.clotheColor,
      selectedAttributes.clotheType,
      selectedAttributes.eyeType,
      selectedAttributes.eyebrowType,
      selectedAttributes.facialHairColor,
      selectedAttributes.facialHairType,
      selectedAttributes.hairColor,
      selectedAttributes.hatColor,
      selectedAttributes.graphicType,
      selectedAttributes.mouthType,
      selectedAttributes.skinColor,
      selectedAttributes.topType,
    ];

    setAttributesArray(newAttributesArray);
  }, [selectedAttributes]);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSelectedAttributes(prevState => {
      const updatedAttributes = { ...prevState, [name]: Number(value) };
      return updatedAttributes;
    });
    updateAttributesArray();
  };

  const handleMint = async () => {
    try {
      const attributesArray: [
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number,
      ] = [
        selectedAttributes.accessoriesType,
        selectedAttributes.clotheColor,
        selectedAttributes.clotheType,
        selectedAttributes.eyeType,
        selectedAttributes.eyebrowType,
        selectedAttributes.facialHairColor,
        selectedAttributes.facialHairType,
        selectedAttributes.hairColor,
        selectedAttributes.hatColor,
        selectedAttributes.graphicType,
        selectedAttributes.mouthType,
        selectedAttributes.skinColor,
        selectedAttributes.topType,
      ];

      setAttributesArray(attributesArray);

      await writeContractAsync({
        functionName: "mint",
        args: [attributesArray],
      });
    } catch (e) {
      console.error("Error generando el token:", e);
    }
  };

  const handleRandomize = () => {
    const randomAttributes = Object.fromEntries(
      Object.entries(attributes).map(([key, values]) => [key, Math.floor(Math.random() * values.length)]),
    ) as {
      accessoriesType: number;
      clotheColor: number;
      clotheType: number;
      eyeType: number;
      eyebrowType: number;
      facialHairColor: number;
      facialHairType: number;
      hairColor: number;
      hatColor: number;
      graphicType: number;
      mouthType: number;
      skinColor: number;
      topType: number;
    };

    setSelectedAttributes(randomAttributes);
    updateAttributesArray();
  };

  // Uso del hook personalizado para obtener la imagen de previsualización
  const { previewImage, isLoading } = usePreviewImage(attributesArray || [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

  useEffect(() => {
    updateAttributesArray();
  }, [selectedAttributes, updateAttributesArray]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-6xl px-5">
        <div className="flex flex-wrap md:flex-nowrap gap-8">
          <div className="bg-base-100 shadow-lg shadow-secondary border-8 border-secondary rounded-xl p-8">
            <h2 className="text-center text-2xl font-bold mb-6">Genera el Retrato Hablado 🖌️</h2>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.keys(attributes).map(key => (
                <div key={key} className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    {translations[key as keyof typeof translations]}
                  </label>
                  <select
                    name={key}
                    value={selectedAttributes[key as keyof typeof selectedAttributes]}
                    onChange={handleSelectChange}
                    className="form-select mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                  >
                    {attributes[key as keyof typeof attributes].map((attr, index) => (
                      <option key={index} value={index}>
                        {attr}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </form>
            <div className="flex justify-center mt-6 space-x-4">
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                onClick={handleRandomize}
              >
                Generar Aleatorio 🎲
              </button>
              <button
                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400"
                onClick={handleMint}
                disabled={isPending}
              >
                {isPending ? <span>Cargando...</span> : "Generar Token 🚀"}
              </button>
            </div>
          </div>
          <div className="bg-base-100 shadow-lg shadow-secondary border-8 border-secondary rounded-xl p-8">
            <h2 className="text-center text-2xl font-bold mb-6">Se Busca 🔍</h2>
            <div className="flex items-center justify-center h-full">
              {isLoading ? (
                <p className="text-gray-500">Cargando previsualización...</p>
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={previewImage} alt="Previsualización del avatar" className="w-full h-full object-contain" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
