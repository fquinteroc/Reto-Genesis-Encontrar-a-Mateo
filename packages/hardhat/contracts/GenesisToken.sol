// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import "./GenesisTokenADN.sol";

contract GenesisToken is ERC721, ERC721Enumerable, GenesisTokenADN {
    string public greeting = "Genesis Token Contract";
    using Counters for Counters.Counter;
    using Strings for uint256;

    Counters.Counter private _idCounter;
    uint256 public maxSupply;
    mapping(uint256 => uint8[13]) public tokenAttributes;

    constructor(uint256 _maxSupply) ERC721("GenesisToken", "GTK") {
        maxSupply = _maxSupply;
    }

    // Permite crear un nuevo token con los atributos seleccionados
    function mint(uint8[13] memory selectedAttributes) public {
        // Paso 1 : Obtener el ID actual del contador ✅ 
        // uint256 current = _idCounter.current();

        // Paso 2: Verificar que el ID actual (current) sea menor que maxSupply

        // Paso 3: Asignar los atributos seleccionados al token actual

        // Paso 4: Acuñar (mint) el nuevo token usando _safeMint

        // Paso 5: Incrementar el contador de IDs ✅ 
        // _idCounter.increment();
    }

    // Retorna la URI base para las imágenes de los tokens
    function _baseURI() internal pure override returns (string memory) {
        return "https://avataaars.io/";
    }

    // Esta función construye la cadena de parámetros de la URI basada en los atributos del token
    function _paramsURI(uint8[13] memory attributes) internal view returns (string memory) {
        // Paso 1: Definir un array de strings de 13 posiciones para los parámetros llamado params usando memory

        /* Paso 2: Asignar valores a cada posición del array usando las funciones get de GenesisTokenADN 

        Nota: El objetivo de este paso es construir la URL de la imagen del avatar. La URL debe tener el siguiente formato:
        https://avataaars.io/?accessoriesType=Kurt&clotheColor=Blue02&clotheType=GraphicShirt&eyeType=Wink&eyebrowType=UpDown&facialHairColor=Red
        &facialHairType=MoustacheFancy&hairColor=PastelPink&hatColor=Heather&graphicType=Selena&mouthType=Smile&skinColor=Tanned&topType=ShortHairDreads02

        En esta función, concatenaremos todos los atributos del avatar que se ven en la URL justo después de avataaars.io/?

        Es importante tener en cuenta que el array attributes recibido del frontend tiene 13 posiciones y los atributos están ordenados de la siguiente forma:
        
        0: accessoriesType, 1: clotheColor, 2: clotheType, 3: eyeType, 4: eyebrowType, 
        5: facialHairColor, 6: facialHairType, 7: hairColor, 8: hatColor, 9: graphicType, 
        10: mouthType, 11: skinColor, 12: topType

        El orden debe conservarse para que la URL de la imagen del avatar se genere correctamente según los datos del frontend.

        Tu tarea en este paso es asignar a cada posición del array params el valor correspondiente a cada atributo del avatar.
        Para cada atributo:
        1. Utiliza la función de GenesisTokenADN correspondiente para convertir el valor numérico en el nombre del atributo (por ejemplo, 0 -> Kurt para accessoriesType).
        2. Concatenar el nombre del atributo con el valor del atributo en formato "atributo=valor".
        3. Asigna esta cadena resultante a la posición correspondiente en el array params.

        Nota: Para concatenar strings en Solidity, utiliza abi.encodePacked(string1, string2, ...). Esto devuelve un valor de tipo memory, por lo que debe ser convertido a string.
        
        Ejemplo: Si attributes[0] = 0, usa getAccessoriesType(attributes[0]) para obtener "Kurt", y luego construye la cadena "accessoriesType=Kurt".
        Asigna esta cadena a params[0].
        */
        

        // Paso 3: Inicializar una variable string para los resultados concatenados ✅ 
        // string memory result = params[0];

        // Paso 4: Concatenar todos los parámetros en un solo string y colocando entre ellos el caracter "&"


        // Paso 5: Retornar el string concatenado ✅ 
        // return result;
    }

    // Esta función genera la URL completa para la imagen de un token específico basado en sus atributos
    function imageByAttributes(uint8[13] memory attributes) public view returns (string memory) {
        // Paso 1: Obtener la URI base usando _baseURI y guardarla en una variable string memory llamada baseURI

        // Paso 2: Obtener los parámetros de la URI usando _paramsURI y guardarla en una variable string memory llamada paramsURI

        /* Paso 3: Concatenar la URI base y los parámetros para formar la URL completa de la imagen y retornar ese valor concatenado, 
           recuerda que entre el valor de baseURI y paramsURI debe ir el caracter "?"
        */

    }

    // Esta función genera la descripción completa de un token en formato JSON y la codifica en Base64
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        // Paso 1: Verificar que el token exista usando _exists

        // Paso 2: Obtener los atributos del token usando tokenAttributes ✅ 
        // uint8[13] memory attributes = tokenAttributes[tokenId];

        // Paso 3: Obtener la URL de la imagen usando imageByAttributes y guardarla en una variable string memory llamada image

        // Paso 4: Crear el JSON de la metadata y codificarlo en Base64 ✅ 
        // string memory jsonURI = Base64.encode(
        //     abi.encodePacked(
        //         '{ "name": "GenesisToken #',
        //         tokenId.toString(),
        //         '", "description": "Los Genesis Tokens son retratos hablados de personas buscadas", "image": "',
        //         image,
        //         '"}'
        //     )
        // );

        // Paso 5: Retornar el JSON codificado en una URL de datos ✅ 
        // return string(abi.encodePacked("data:application/json;base64,", jsonURI));
    }

    // Esta función permite previsualizar la imagen de los atributos seleccionados
    function previewImage(uint8[13] memory selectedAttributes) public view returns (string memory) {
        // Paso 1: Llamar a imageByAttributes con los atributos seleccionados y retornar el resultado ✅ 
        // return imageByAttributes(selectedAttributes);
    }

    // Esta función devuelve una lista con las URLs de todos los tokens acuñados
    function getAllTokenURIs() public view returns (string[] memory) {
        // Paso 1: Obtener el número total de tokens usando totalSupply

        // Paso 2: Crear un array de strings para almacenar las URLs de los tokens de tamaño total de tokens


        // Paso 3: Llenar el array con las URLs de todos los tokens usando un bucle for y tokenURI


        // Paso 4: Retornar el array de URLs

    }

    // La siguiente función es una sobrescritura requerida por Solidity para manejar la transferencia de tokens
    function _beforeTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize) internal override(ERC721, ERC721Enumerable) {
        // No modificar esta función. Llamar a la función super para manejar la transferencia de tokens.
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    // La siguiente función es una sobrescritura requerida por Solidity para manejar la compatibilidad de interfaces
    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721Enumerable) returns (bool) {
        // No modificar esta función. Llamar a la función super para manejar la compatibilidad de interfaces.
        return super.supportsInterface(interfaceId);
    }
}
