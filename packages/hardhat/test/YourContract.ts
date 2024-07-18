import { expect } from "chai";
import { ethers } from "hardhat";
import { GenesisToken } from "../typechain-types";

describe("Contrato GenesisToken", function () {
  const setup = async ({ maxSupply = 10000 }) => {
    const [owner] = await ethers.getSigners();
    const GenesisTokenFactory = await ethers.getContractFactory("GenesisToken");
    const deployed = (await GenesisTokenFactory.deploy(maxSupply)) as GenesisToken;
    await deployed.waitForDeployment(); // Esperar a que el contrato se despliegue
    return {
      owner,
      deployed,
    };
  };

  describe("Despliegue", () => {
    it("Establece el máximo número de tokens", async () => {
      const maxSupply = 4000;
      const { deployed } = await setup({ maxSupply });

      const returnedMaxSupply = await deployed.maxSupply();
      expect(returnedMaxSupply).to.equal(maxSupply);
    });

    it("Inicializa el saludo correctamente", async () => {
      const { deployed } = await setup({});
      const greeting = await deployed.greeting();
      expect(greeting).to.equal("Genesis Token Contract");
    });
  });

  describe("mint", () => {
    it("Crea un nuevo token y lo asocia a su propietario", async () => {
      const { owner, deployed } = await setup({});

      const selectedAttributes = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
      await deployed.mint(selectedAttributes);

      const ownerOfMinted = await deployed.ownerOf(0);
      expect(ownerOfMinted).to.equal(owner.address);
    });

    it("Tiene un limite de tokens", async () => {
      const maxSupply = 2;
      const { deployed } = await setup({ maxSupply });

      const selectedAttributes = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

      // mint 2 tokens
      await deployed.mint(selectedAttributes);
      await deployed.mint(selectedAttributes);

      // Verificar el error al intentar acuñar un tercer token
      await expect(deployed.mint(selectedAttributes)).to.be.revertedWith("No more tokens available");
    });
  });

  describe("tokenURI", () => {
    it("devuelve metadatos válidos", async () => {
      const { deployed } = await setup({});

      const selectedAttributes = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
      await deployed.mint(selectedAttributes);

      const tokenURI = await deployed.tokenURI(0);
      const stringifiedTokenURI = tokenURI.toString();
      const [, base64JSON] = stringifiedTokenURI.split("data:application/json;base64,");
      const stringifiedMetadata = Buffer.from(base64JSON, "base64").toString("ascii");

      const metadata = JSON.parse(stringifiedMetadata);

      expect(metadata).to.have.all.keys("name", "description", "image");
      expect(metadata.name).to.equal("GenesisToken #0");
      expect(metadata.description).to.equal("Los Genesis Tokens son retratos hablados de personas buscadas");
    });
  });

  describe("Vista previa de imagen", () => {
    it("Genera una URL de imagen válida para los atributos dados", async () => {
      const { deployed } = await setup({});

      const selectedAttributes = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
      const imageURL = await deployed.previewImage(selectedAttributes);

      expect(imageURL).to.include("https://avataaars.io/");
    });
  });

  describe("Obtener todas las URIs de tokens", () => {
    it("Devuelve todas las URIs de tokens creados", async () => {
      const { deployed } = await setup({});

      const selectedAttributes = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
      await deployed.mint(selectedAttributes);
      await deployed.mint(selectedAttributes);

      const allTokenURIs = await deployed.getAllTokenURIs();

      expect(allTokenURIs.length).to.equal(2);
      expect(allTokenURIs[0]).to.include("data:application/json;base64,");
      expect(allTokenURIs[1]).to.include("data:application/json;base64,");
    });
  });
});
