# Shared Tree Demo

This app demonstrates how to create a simple tree data structure and build a React app using that data.

## Setting up the Fluid Framework

This app is designed to use
[Azure Fluid Relay](https://aka.ms/azurefluidrelay) a Fluid relay service offered by Microsoft. You can also run a local service for development purposes. Instructions on how to set up a Fluid relay are on the [Fluid Framework website](aka.ms/fluid).

To use AzureClient's local mode, you first need to start a local server. Running npx @fluidframework/azure-local-service@latest from your terminal window will launch the Azure Fluid Relay local server. Once the server is started, you can run your application against the local service.

One important note is that you will need to use a token provider or, purely for testing and development, use the insecure token provider. There are instructions on how to set this up on the [Fluid Framework website](aka.ms/fluid).

All the code required to set up the Fluid Framework and SharedTree data structure is in the infra folder. Most of this code will be the same for any app.

## Schema Definition

The SharedTree schema is defined in the \_schema.ts source files. This schema is passed into the SharedTree when it is initialized in index.tsx. For more details, see the schema.ts comments.

## Working with Data

Working with data in the SharedTree is very simple; however, working with distributed data is always a little more complicated than working with local data. To isolate this complexity, this app uses a set of helper functions in the \_helpers.ts source files and in the schema itself that take types defined in the schema as input and modify the data in some way. Each function includes a brief description of how it works.

One important note about managing local state and events: ideally, in any app you write, it is best to not
special case local changes. Treat the SharedTree as your local data and rely on tree events to update your view. This makes the code reliable and easy to maintain. Also, never mutate tree nodes within events listeners.

## User Interface

This app is built using React. Changes to the data are handled using the helper functions mentioned above. If you look at the code in \*ux.tsx files, you'll find very little code that is unique to an app built with the Fluid Framework. If you want to change the css you must run 'npx tailwindcss -i ./src/index.css -o ./src/output.css --watch' in the root folder of your project so that tailwind can update the output.css file.

## Example Parsable Table

Source: https://blog.d4caltrops.com/2024/03/d100-magical-spears.html

Magical Spears
1 Bane of Shelled Creatures (Turtles, Snails, Crabs), inflicts double damage 
51 Makes a serviceable Spit: Any Food Cooked on it Feeds Twice as Many
2 Barbs on Point, dislodge in those struck: Track unerringly for 2 weeks 
52 Mend a damaged Shield, dented Helm, or heal a broken Bone 1/week
3 Bearer is Invisible to Clerics and other Pious Types 
53 On Maximum Damage, wreathes the Target in Pale Purple Flames (as Faerie Fire)
4 Becomes a Ladder, twice as Bearer is Tall for an hour, once a day 
54 Once per Day, Speartip can Light via Flame Torches, Oil, Combustibles
5 Bowing to their Master, another Spear/Polearm in sight Bends 1/month 
55 Owned by a Hobgoblin King: Better Reaction, on 12: Gain 1d6 Bodyguards
6 Braced in a Phalanx, all Spears that hit do the highest damage roll of them all 
56 Pierces Souls, those Slain cannot be Returned to Life by conventional means
7 Buried in a Dragon's Hoard for Centuries: Learned many facts about their Kind 
57 Pin Ghosts/Shadows/Incorporeal Creatures to Solid Objects on a Successful Attack
8 Campfire stoked/tended with this will repel any Monsters for a full Night: 1/week 
58 Placed in a Bed during the Day, anyone Sleeping in it that night is Healed by Half
9 Can be Walked across quite comfortably, regardless of Balancing Ability 
59 Pointed at a Rain Cloud, can either prevent or induce Rain for up to an Hour
10 Canines who gnaw on the Haft for a Day are granted the power of Speech 
60 Pole-Vaulting with this doubles the triples the Distance/Height
11 Carried into War by a General, the third major battle will be victorious 
61 Returns to hand when Thrown, each Miss doubles damage, resets on Hit
12 Causes Golems/Gargoyles to Bleed a strange substance when struck 
62 Rubbed with Dirt from a Grave, can Teleport to hand of Family Member 1/day
13 Changes form from Javelin, Spear, Pike on Command if bathed in Wine 
63 Scroll wrapped around Haft is absorbed 1/month: Wielder can Cast Spell
14 Choose to appear as a Skeleton while Wielding for 2 hours/day. Undead ignore 
64 Serves as a Lightning Rod: Electrical Attacks do not harm the Wielder
15 Completely Protects Wielder from the Breath of the Last Dragon Type Slain with it 
65 Set vs Calvary, any Horse Charging must make a Morale Check
16 Conjure forth an Identical Duplicate of yourself (always with Spear) lasts an hour 
66 Severed Head placed on it can Speak for an Hour, may not be cooperative
17 Creature stabbed by this is unable to tell a Lie for until next Sunrise/Sunset 
67 Shapechange into a Dire Porcupine 1/month (as Bear, volley of 2d6 arrows)
18 Crescent Shaped Head, See as Day provided at least a Sliver of Moonlight 
68 Sheds indelible Drops of Blood, enough to leave a Trail if necessary
19 Crudely Mended Haft: If Tip is touched to a damaged Weapon, Restores it 
69 Should they be Wounded, anyone Wielder has Kissed in the last Month is aware
20 Double Movement when Retreating, provided a Comrade is still Fighting 
70 Shrinks to the size of a Toothpick: Freshens Breath, grants a Winning Smile
21 Draw a Circle with Tip, stand in Center: All within have Protection from Arrows 
71 Silver tip can Draw a Circle of Protection vs Lycanthropes 1/month
22 Drips a Black Ichor (inflict Giant Scorpion Venom 1/week), never Burn in the Sun 
72 Slaying a Creature that Petrifies returns last Dozen Victims to Flesh
23 Each Sunset can transform into a Hammock, Chair, or 3 Person Tent for 8 hours 
73 Smells faintly of Brimstone: Divine Magic fails on User 2-in-6
24 Etch up to 5 words in any surface, they cannot be effaced or removed: 1/month 
74 Smoke, Miasma, Fogs and so forth do not impair the Vision of the Bearer
25 Fashioned from pitted Bone, Undead are granted Reaction Rolls to Bearer 
75 Snapped asunder, the energy released will Re-grow an Arm or Leg for up to 5 people
26 Fire Volleys of Green Icicles (as Magic Missile, 1d8 Daily) if kept out of the Sun 
76 Soulbound to a Friendly Troll, grants Regeneration but also the Weaknesses
27 Flung at an Opponent bearing a Shield: Completely Destroys it (Magic gets a Save) 
77 Splits in twain when Thrown, striking two Targets, once per week
28 For up to half an hour: Bearer can turn themselves into a Lead Statuette once a week 
78 Stores up to six other Spears touched to it, steals a Foes with a Save
29 Force a King or Ruler to Bow Before this Spear: Once a Year 
79 Substitute one of your Languages with one from the last Creature Slain with this
30 Forego Sleep completely if it's held in both hands, for up to four nights 
80 Summon a Spectral Charger once per week, lasts until Sunrise
31 Friendly Reactions with Ghosts/Spirits: User can turn Ethereal for 3 turns 
81 Tap into Mycelium Network: Commune 1/day or Grow 2d8 Edible Mushrooms
32 Glows Balefully Brown in the presence of dangerous Moulds and Slimes 
82 Thieves roll twice take Worst when performing Abilities in Lantern hung from it
33 Gouts up to 4 Vials worth of Holy Water 1/week provided Owner Prays 
83 Those Slain by this bear no Mark or Sign of what led to their Death
34 Grants a Shared Language between two who hold each end Barehanded 
84 Thrown in a Contest/Game of Skill, always flies one length further than others
35 Haft Curls around Wrist/Forearm, making Disarming difficult 
85 Tip renders up to a gallon of Water Fresh and Holy once a week
36 Harpoon-like Strap: Tethers Creature Struck across Planes 
86 Touching the Heel to a Tree: Any Fruit will instantly Ripen and Fall
37 Heel buried in the Earth: Transform into 20 paces of Palisades for a day 
87 Transforms into a Venomous Serpent on Command for up to 3 Turns
38 Helmed Creature Stabbed with this has their Helmet Knocked off 
88 Triple effective STR when using this as a Lever to move a Heavy Object
39 Helped Slay a Legendary Boar, all Porcine Creatures Fear it now 
89 Tuned to Magical Frequencies, 1-in-6 of redirecting Beneficial Spells to the Wielder
40 Holy Symbols from Tip: Nearby Turn Undead empowered as 2d8 1/week 
90 Unhorses Mounted Foes if evens are rolled for Damage
41 Horses ridden by the Bearer can Gallop/Trot across the top of Water 
91 Up to a Score of other Spearmen Fighting alongside you need not check Morale
42 Hurled at a Flying Creature, they must immediately land 
92 Used to Spear Fish by a Hungry Hunter, never errs on it's Strike
43 If used to Bar a Door, nothing shy of Ogre Strength can budge it 
93 Vibrates fervently in the presence of Treasure concealed in Stomach or Crop
44 Impales Target on Max Damage, only removable with Command Word 
94 Viciously Sharp Tooth for Point: Bearer immune to any kind of Bite Attacks
45 Infested with Friendly Termites: 1/week 1 Grows as a Giant Ant, serves for 3 hours 
95 Water to Brine 1/day. Up to a Barrel's worth: Add Cucumbers and Instant Pickles
46 Inflicts the last Venom the Bearer suffered from on successful strikes 
96 When Fighting from 2nd Rank, heal 1st Rank equal to damage inflicted 1/day
47 Instantly Slays the next 1d6+1 Creatures it Damages. No Save 
97 While Carried Aboard a Ship or Boat, the Vessel is immune to Fire
48 Laid in a Circle of Salt, spins to point to nearest Fairy Hoard 
98 Whistles Ancient Prayers in the Wind: Game Animals Save or Die when hit
49 Leaves Hides miraculously un-marred, fetch a better price from Fellmonger 
99 Wielder's Vision becomes Blue/White for an hour: Illusions are in Color
50 Magical Spell Defenses (Walls, Globes, and the like) do not interfere with it 
100 With a Command Word: Remains Motionless in space, supporting up to a Ton

## Building and Running

You can use the following npm scripts (`npm run SCRIPT-NAME`) to build and run the app.

<!-- AUTO-GENERATED-CONTENT:START (SCRIPTS) -->

| Script      | Description                                                                           |
| ----------- | ------------------------------------------------------------------------------------- |
| `build`     | `npm run format && npm run webpack`                                                   |
| `compile`   | Compile the TypeScript source code to JavaScript.                                     |
| `dev`       | Runs the app in webpack-dev-server. Expects local-azure-service running on port 7070. |
| `dev:azure` | Runs the app in webpack-dev-server using the Azure Fluid Relay config.                |
| `format`    | Format source code using Prettier.                                                    |
| `lint`      | Lint source code using ESLint                                                         |
| `webpack`   | `webpack`                                                                             |
| `start`     | `npm run dev`                                                                         |

<!-- AUTO-GENERATED-CONTENT:END -->
