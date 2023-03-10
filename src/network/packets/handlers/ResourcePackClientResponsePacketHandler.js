/******************************************\
 *  ____  _            ____  _         _  *
 * | __ )| |_   _  ___| __ )(_)_ __ __| | *
 * |  _ \| | | | |/ _ \  _ \| | '__/ _` | *
 * | |_) | | |_| |  __/ |_) | | | | (_| | *
 * |____/|_|\__,_|\___|____/|_|_|  \__,_| *
 *                                        *
 * This file is licensed under the GNU    *
 * General Public License 3. To use or    *
 * modify it you must accept the terms    *
 * of the license.                        *
 * ___________________________            *
 * \ @author BlueBirdMC Team /            *
\******************************************/

const PermissionLevel = require("../../constants/PermissionLevel");
const ResourcePackClientResponseStatus = require("../../constants/ResourcePackClientResponeStatus");
const Vector3F = require("../../types/Vector3F");
const ResourcePackStackPacket = require("../ResourcePackStackPacket");
const StartGamePacket = require("../StartGamePacket");
const HandlersBase = require("./HandlersBase");
const { Compound } = require("bbmc-nbt");
const EducationSharedResourceURI = require("../../types/EducationSharedResourceURI");
const BroadcastMode = require("../../constants/BroadcastMode");
const WorldType = require("../../constants/WorldType");
const BiomeDefinitionListPacket = require("../BiomeDefinitionListPacket");
const CreativeContentPacket = require("../CreativeContentPacket");
const GameMode = require("../../constants/GameMode");
const PlayStatus = require("../../constants/PlayStatus");
const AvailableActorIdentifiersPacket = require("../AvailableActorIdentifiersPacket");
const ChatRestrictionLevel = require("../../constants/ChatRestrictionLevel");
const canceller = require("../../../event/canceller");
const ServerInfo = require("../../../ServerInfo");

class ResourcePackClientResponsePacketHandler extends HandlersBase {
	async startHandling(packet) {
		await super.startHandling(packet);
		switch(packet.responseStatus) {
			case ResourcePackClientResponseStatus.refused:
				this.player.disconnect("You must accept the resource pack");
				break;
			case ResourcePackClientResponseStatus.sendPacks:
				break;
			case ResourcePackClientResponseStatus.none:
			case ResourcePackClientResponseStatus.haveAllPacks:
				const resourcePackStack = new ResourcePackStackPacket();
				resourcePackStack.mustAccept = false;
				resourcePackStack.behaviorPacks = [];
				resourcePackStack.texturePacks = [];
				resourcePackStack.gameVersion = ServerInfo.minecraftVersion;
				resourcePackStack.experiments = [];
				resourcePackStack.experimentsPreviouslyUsed = false;
				resourcePackStack.sendTo(this.player);
				break;
			case ResourcePackClientResponseStatus.completed:
				let worldPos = new Vector3F(); // temp
				worldPos.x = 0.0;
				worldPos.y = 6.0;
				worldPos.z = 0.0;
				const startGame = new StartGamePacket();
				startGame.entityID = BigInt(this.player.id);
				startGame.runtimeEntityID = this.player.id;
				startGame.playerGamemode = this.player.gamemode;
				startGame.playerPosition = this.player.position;
				startGame.rotation = this.player.rotation;
				startGame.seed = 0n;
				startGame.biomeType = 0;
				startGame.biomeName = "plains";
				startGame.dimension = 0;
				startGame.worldType = WorldType.infinite;
				startGame.worldGamemode = GameMode.survival;
				startGame.difficulty = 0;
				startGame.spawnPosition = worldPos;
				startGame.achievementsDisabled = false;
				startGame.editorWorld = false;
				startGame.dayCycleStopTime = false;
				startGame.eduOffer = 0;
				startGame.eduFeaturesEnabled = false;
				startGame.eduProductUUID = "c109c9c5-beec-42ad-a4d1-524226afad2f";
				startGame.rainLevel = 0.0;
				startGame.lightningLevel = 0.0;
				startGame.hasConfirmedPlatformLockedContent = false;
				startGame.isMultiplayer = true;
				startGame.broadcastToLAN = true;
				startGame.xboxLiveBroadcatMode = BroadcastMode.public;
				startGame.platformBroadcastMode = BroadcastMode.public;
				startGame.enableCommands = true;
				startGame.requireResourcePacks = false;
				startGame.gameRules = [];
				startGame.experiments = [];
				startGame.experimentsPreviouslyUsed = false;
				startGame.bonusChest = false;
				startGame.mapEnabled = false;
				startGame.permissionLevel = PermissionLevel.member;
				startGame.serverChunkTickRange = 0;
				startGame.hasLockedBehaviorPack = false;
				startGame.hasLockedTexturepack = false;
				startGame.isFromLockedWorldTemplate = false;
				startGame.msaGamertagsOnly = false;
				startGame.isFromWorldTemplate = false;
				startGame.isWorldTemplateOptionLocked = false;
				startGame.onlySpawnV1Villagers = false;
				startGame.personaDisabled = false;
				startGame.customSkinsDisabled = false;
				startGame.gameVersion = ServerInfo.minecraftVersion;
				startGame.limitedWorldWidth = 0;
				startGame.limitedWorldLength = 0;
				startGame.isNewNether = true;
				startGame.eduResourceURI = new EducationSharedResourceURI();
				startGame.eduResourceURI.buttonName = "";
				startGame.eduResourceURI.linkURI = "";
				startGame.experimentalGameplayOverride = false;
				startGame.levelID = "d0b70794-7c5a-45f6-bb57-9446ac562b45";
				startGame.chatRestrictionLevel = ChatRestrictionLevel.none;
				startGame.playerInteractionsDisabled = false;
				startGame.worldName = "test";
				startGame.premiumWorldTemplateID = "1c6bbf43-a2a9-4336-bc35-954a83da1856";
				startGame.isTrial = false;
				startGame.movementAuthority = 0;
				startGame.rewindHistorySize = 0;
				startGame.serverAuthoritativeBlockBreaking = false;
				startGame.currentTick = 0n;
				startGame.enchantmentSeed = 0;
				startGame.blockProperties = [];
				startGame.itemStates = this.server.resourceManager.itemStatesMap.states;
				startGame.multiplayerCorrelationID = "";
				startGame.serverAuthoritativeInventory = false;
				startGame.engine = ServerInfo.engine;
				startGame.propertyData = new Compound();
				startGame.blockPaletteChecksum = 0n;
				startGame.worldTemplateID = "a1023eb3-bc3e-47cd-afab-e631a154dd05";
				startGame.clientSideGeneration = false;
				startGame.sendTo(this.player);

				const biomeDefinitionList = new BiomeDefinitionListPacket();
				biomeDefinitionList.nbt = this.server.resourceManager.biomeDefinitionList;
				biomeDefinitionList.sendTo(this.player);

				const availableActorIdentifiers = new AvailableActorIdentifiersPacket();
				availableActorIdentifiers.nbt = this.server.resourceManager.availableEntityIdentifiers;
				availableActorIdentifiers.sendTo(this.player);

				const creativeContent = new CreativeContentPacket();
				creativeContent.entries = this.server.resourceManager.creativeItems;
				creativeContent.sendTo(this.player);

				if (!this.player.resourcePackClientResponseSent) {
					let ev = { // joinevent place shouldnt be here
						player: this.player,
						message: "",
						canceller: new canceller()
					};
					this.server.addEvent(ev, "join");
					if (ev.canceller.isCancelled()) {
						delete this.server.players[this.player.connection.address.toString()];
						this.player.disconnect("", false);
						return;
					} else {
						if (this.player.spawned) {
							this.server.log.info(ev.message ? ev.message : "Player joined the game");
						}
					}
					this.player.resourcePackClientResponseSent = true;
				}
				this.player.sendPlayStatus(PlayStatus.playerSpawn);
				break;
		}
	}
}

module.exports = ResourcePackClientResponsePacketHandler;
