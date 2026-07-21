export const INITIAL_PRODUCTS = [
    // --- AUDIO (6 items) ---
    {
        id: 1,
        title: "Void Over-Ear Active Noise-Cancelling Headphones",
        category: "Audio",
        price: 299.99,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=600",
        description: "Immerse yourself in pure sound with the Void ANC Headphones. Featuring custom-tuned 40mm dynamic drivers and hybrid active noise cancellation, they block out up to 98% of ambient noise so you can focus on what matters.",
        rating: 4.8,
        reviewCount: 154,
        specs: {
            "Battery Life": "Up to 45 hours (ANC off), 35 hours (ANC on)",
            "Charging": "USB-C Fast Charging (10 min charge = 5 hours playback)",
            "Connectivity": "Bluetooth 5.2, 3.5mm Aux",
            "Colors": "Obsidian Black, Arctic Grey, Champagne Gold",
            "Warranty": "2 Year Manufacturer Warranty"
        },
        features: [
            "Hybrid Active Noise Cancellation",
            "Hi-Res Audio Certified with LDAC support",
            "Ultra-soft memory foam earcups",
            "Multi-point connection to switch between devices automatically",
            "Custom EQ profile tuning via App"
        ]
    },
    {
        id: 2,
        title: "Aura True Wireless Earbuds",
        category: "Audio",
        price: 159.99,
        image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=600",
        description: "Compact in size, monumental in sound. The Aura wireless earbuds deliver rich bass tones and crisp trebles with a premium fits that stays comfortable all day.",
        rating: 4.6,
        reviewCount: 382,
        specs: {
            "Battery Life": "8 hours (earbuds), additional 24 hours via case",
            "Waterproofing": "IPX7 Sweat and Water Resistant",
            "Connectivity": "Bluetooth 5.3, Ultra-low latency Mode",
            "Microphones": "6 beamforming mics for crystal-clear calls",
            "Warranty": "1 Year Warranty"
        },
        features: [
            "Touch Controls with haptic response",
            "In-Ear Detection sensors",
            "Wireless charging case (Qi compatible)",
            "Transparency Mode for hearing external surroundings",
            "Adaptive ANC matching ear canal shapes"
        ]
    },
    {
        id: 3,
        title: "Sync Pro Desktop Studio Monitors",
        category: "Audio",
        price: 249.99,
        image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&q=80&w=600",
        description: "Elevate your desktop acoustic setup with Sync Pro monitors. Engineered for musical accuracy and crystal clear acoustic reproduction, they are perfect for content creators, music producers, and audiophiles alike.",
        rating: 4.7,
        reviewCount: 92,
        specs: {
            "Output Power": "80W RMS (Peak 120W)",
            "Drivers": "4-inch Kevlar woofer, 1-inch silk dome tweeter",
            "Inputs": "Balanced TRS, RCA, Optical, Bluetooth",
            "Frequency Range": "50Hz - 20kHz",
            "Dimensions": "220 x 145 x 180 mm per speaker"
        },
        features: [
            "Acoustic room correction switches",
            "High-density MDF cabinet prevents distortion",
            "Front-facing headphone jack for direct monitoring",
            "Qualcomm aptX HD Bluetooth connectivity",
            "Custom-designed waveguide for wide audio sweetspot"
        ]
    },
    {
        id: 4,
        title: "Echo Wave Portable Waterproof Speaker",
        category: "Audio",
        price: 79.99,
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&q=80&w=600",
        description: "Take your soundtrack anywhere. The Echo Wave provides powerful 360-degree sound in an rugged waterproof body, designed to withstand drops, spills, and outdoor adventures.",
        rating: 4.5,
        reviewCount: 512,
        specs: {
            "Battery Life": "Up to 20 hours play time",
            "Ruggedness": "IP67 Dust & Fully Waterproof",
            "Power Output": "20W Stereo Sound",
            "Weight": "540g",
            "Colors": "Midnight Teal, Charcoal Black, Sunset Red"
        },
        features: [
            "PartySync link up to 100 speakers together",
            "Integrated heavy-duty carry strap",
            "Built-in power bank to charge mobile phones",
            "Dual passive radiators for rich, chest-thumping bass"
        ]
    },
    {
        id: 5,
        title: "Rhapsody Vintage Hi-Fi Turntable",
        category: "Audio",
        price: 349.99,
        image: "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?auto=format&fit=crop&q=80&w=600",
        description: "Classic design meets modern conveniences. The Rhapsody turntable plays 33 and 45 RPM records, featuring a belt-drive system, Audio-Technica magnetic cartridge, and a built-in pre-amplifier for absolute audio fidelity.",
        rating: 4.8,
        reviewCount: 67,
        specs: {
            "Cartridge": "Audio-Technica AT3600L moving magnet",
            "Speed Support": "33-1/3 RPM, 45 RPM",
            "Connectivity": "Phono out, Line out, USB (PC link for vinyl encoding)",
            "Finish": "Walnut wood veneer, brushed aluminum knobs",
            "Wow & Flutter": "< 0.15%"
        },
        features: [
            "Belt-driven system with auto-stop function",
            "Integrated Phono Pre-Amp for versatility",
            "USB out to convert vinyl records to digital MP3s",
            "Adjustable counterweight and anti-skating mechanisms"
        ]
    },
    {
        id: 6,
        title: "Sonora Spatial Soundbar Pro",
        category: "Audio",
        price: 499.99,
        image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&q=80&w=600",
        description: "A complete home cinema experience in a single unit. Equipped with Dolby Atmos and 7 integrated speakers, the Sonora bounces audio off boundaries to create enveloping surround sound.",
        rating: 4.9,
        reviewCount: 119,
        specs: {
            "Audio Channels": "5.1.2 Dolby Atmos enabled",
            "Connectivity": "HDMI eARC, Optical, AirPlay 2, Spotify Connect",
            "Total Power": "220W RMS",
            "Control": "Voice assistants supported (Alexa, Google)",
            "Warranty": "3 Year Warranty"
        },
        features: [
            "Dolby Atmos and DTS:X decoding",
            "Integrated dual subwoofers for chest-thumping action",
            "Adaptive sound profile optimization based on room size",
            "Premium glass top plate and metallic mesh grille"
        ]
    },

    // --- GAMING (6 items) ---
    {
        id: 7,
        title: "Nebula Pro Mechanical Keyboard",
        category: "Gaming",
        price: 149.99,
        image: "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80&w=600",
        description: "Engineered for elite competitive gamers. The Nebula Pro Mechanical Keyboard features lubrication-treated hot-swappable linear yellow switches, double-shot PBT keycaps, and brilliant per-key backlighting.",
        rating: 4.9,
        reviewCount: 247,
        specs: {
            "Switches": "Hot-swappable Yellow Linear (50g actuation)",
            "Latency": "0.125ms (8000Hz polling rate)",
            "Keycaps": "Double-shot PBT cherry profile",
            "Form Factor": "Tenkeyless (TKL - 80%) layout",
            "Chassis": "CNC anodized aluminum body"
        },
        features: [
            "Ultra-responsive custom switches with high durability",
            "Per-key RGB backlighting with customizable patterns",
            "Hot-swappable sockets supporting standard 3-pin and 5-pin key switches",
            "Sound dampening poron foam pre-installed",
            "Multi-function rotary control scroll wheel"
        ]
    },
    {
        id: 8,
        title: "Quantum Gaming Mouse",
        category: "Gaming",
        price: 89.99,
        image: "https://images.unsplash.com/photo-1527814050087-379381547969?auto=format&fit=crop&q=80&w=600",
        description: "Unrivaled agility and accuracy. The Quantum Gaming Mouse features a high-density 26,000 DPI sensor, featherlight 58g shell design, and latency-free wireless frequency.",
        rating: 4.7,
        reviewCount: 409,
        specs: {
            "Sensor": "Quantum Tracker 26K Optical",
            "Max Speed": "650 IPS",
            "Weight": "58 grams (extremely lightweight)",
            "Battery Life": "Up to 80 hours on full charge",
            "Buttons": "6 Programmable macro buttons"
        },
        features: [
            "Hyper-fast 2.4Ghz wireless and low-power Bluetooth support",
            "Zero-drag PTFE glide feet",
            "Optical switches rated for 90 million clicks",
            "Onboard memory for profile storage"
        ]
    },
    {
        id: 9,
        title: "Vanguard Curved Gaming Monitor",
        category: "Gaming",
        price: 449.99,
        image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=600",
        description: "Immerse yourself deeper into virtual battlefields. The Vanguard monitor combines an ultra-fast 240Hz refresh rate with a details 34-inch ultrawide 1500R curved profile.",
        rating: 4.8,
        reviewCount: 130,
        specs: {
            "Resolution": "3440 x 1440 UWQHD",
            "Refresh Rate": "240Hz",
            "Curve": "1500R Curvature",
            "Panel Type": "Fast IPS with VESA DisplayHDR 400",
            "Ports": "2x DisplayPort 1.4, 2x HDMI 2.1, USB Hub"
        },
        features: [
            "NVIDIA G-Sync and AMD FreeSync Premium compatible",
            "Superb wide color gamut (98% DCI-P3 coverage)",
            "Fully adjustable height and tilt stand",
            "Built-in RGB ambient backlighting"
        ]
    },
    {
        id: 10,
        title: "Apex Wireless Gaming Headset",
        category: "Gaming",
        price: 199.99,
        image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&q=80&w=600",
        description: "Get tactical spatial awareness in standard-defining audio. The Apex Headset utilizes 50mm carbon fiber diaphragm drivers and 3D spatial surround virtualization.",
        rating: 4.5,
        reviewCount: 284,
        specs: {
            "Wireless Protocol": "2.4GHz Lossless & Bluetooth dual-mode",
            "Microphone": "Retractable bidirection noise cancelling microphone",
            "Weight": "290g",
            "Compatibility": "PC, PS5, Xbox Series X/S, Nintendo Switch",
            "Battery Life": "Up to 50 hours longevity"
        },
        features: [
            "3D Spatial Sound optimization Engine",
            "Suspension head-comfort headband skeleton",
            "Instant game/chat mix dials on-earcap",
            "Plush cooling-gel infused ear liners"
        ]
    },
    {
        id: 11,
        title: "Titanium Mechanical Gamepad",
        category: "Gaming",
        price: 129.99,
        image: "https://images.unsplash.com/photo-1600861195091-690c92f1d2cc?auto=format&fit=crop&q=80&w=600",
        description: "Take exact control. The Titanium Gamepad provides microswitch face buttons, Hall Effect anti-drift analog sticks, and adjustable trigger locks for hyper-fast response.",
        rating: 4.6,
        reviewCount: 167,
        specs: {
            "Sticks": "Hall Effect electromagnetic joysticks",
            "Back Buttons": "4 re-mappable mechanical paddle buttons",
            "Triggers": "Linear hair-pulley triggers",
            "Polling Rate": "1000Hz (wired)",
            "Compatibility": "Windows PC, Xbox, Android"
        },
        features: [
            "Interchangeable thumbstick heads (concave/convex)",
            "Custom profile saving via controller application",
            "Immersive dual-rumble haptic feedback motors",
            "Brushed metallic triggers and grip inserts"
        ]
    },
    {
        id: 12,
        title: "Chronos RGB Desk Charging Stand",
        category: "Gaming",
        price: 49.99,
        image: "https://images.unsplash.com/photo-1616440347437-b1c73416efc2?auto=format&fit=crop&q=80&w=600",
        description: "The ultimate centerpiece for your battle station. Chronos consolidates your headset display, offers a custom USB 3.0 hub, and displays customizable RGB glows matching your gaming aura.",
        rating: 4.4,
        reviewCount: 310,
        specs: {
            "Ports": "3x USB-A 3.1, 1x USB-C fast charge, 3.5mm DAC socket",
            "LED": "10 customizable RGB lighting modes",
            "Build Material": "Brushed aircraft-grade aluminum, heavy grip base",
            "Dimensions": "280 x 120 x 120 mm"
        },
        features: [
            "Direct sound DAC for high-quality audio routing",
            "Sturdy weighted foundation prevents toppling",
            "Cable manager wrap on the back",
            "Syncs lighting with primary gaming rigs via USB software"
        ]
    },

    // --- WEARABLES (6 items) ---
    {
        id: 13,
        title: "Aether Active Smartwatch",
        category: "Wearables",
        price: 199.99,
        image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&q=80&w=600",
        description: "Track your goals, maximize your performance. The Aether Active Smartwatch displays vital metrics on a vivid AMOLED crystal-glass screen. Built for athletes and active lifestyles.",
        rating: 4.7,
        reviewCount: 520,
        specs: {
            "Display": "1.43-inch Always-on Dynamic AMOLED",
            "Sensors": "Optical Heart Rate, SpO2 Blood Oxygen, Multi-frequency GPS",
            "Battery Life": "Up to 12 days normal use, 6 days heavily active",
            "Chassis": "Lightweight titanium and aerospace ceramic",
            "Water Resistance": "5ATM (swim-proof up to 50 meters)"
        },
        features: [
            "Over 120 sports tracking modes built-in",
            "Smart Notification prompts & direct call response",
            "Sleep quality feedback & stress tracker monitoring",
            "Offline map caching capabilities"
        ]
    },
    {
        id: 14,
        title: "Zenith Pro Health Ring",
        category: "Wearables",
        price: 279.99,
        image: "https://images.unsplash.com/photo-1614850523011-8f49fc9ec67a?auto=format&fit=crop&q=80&w=600",
        description: "Advanced health monitoring, subtly wrapped around your finger. The Zenith Ring provides medical-grade monitoring for sleep stages, recovery, temperature cycles, and activity metrics without display distractions.",
        rating: 4.8,
        reviewCount: 89,
        specs: {
            "Sensors": "Infrared PPG sensors, NTC skin temperature sensor",
            "Weight": "Only 4 grams, ultra-slim profile",
            "Charging": "Wireless dock, charges in 80 mins",
            "Battery": "6-7 days on single recharge cycle",
            "Material": "Fighter-jet grade Titanium, hypoallergenic lining"
        },
        features: [
            "Comprehensive Sleep analysis highlighting deep/light/REM cycle info",
            "Skin temperature deviation tracking (early illness warnings)",
            "Daily personal Readiness Score calculations",
            "Zero screen emit distractions promoting natural mindfulness"
        ]
    },
    {
        id: 15,
        title: "Velocity Elite GPS Running Watch",
        category: "Wearables",
        price: 329.99,
        image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&q=80&w=600",
        description: "Designed for triathletes and ultramarathoners. Velocity provides dual-band GPS, offline maps, running power dynamics, and premium solar charging to extend your outdoor tracking sessions indefinitely.",
        rating: 4.9,
        reviewCount: 143,
        specs: {
            "GPS": "Dual-frequency multi-satellite positioning system",
            "Display": "1.3-inch sunlight-reflective MIP display",
            "Solar Charging": "Power Glass extends battery up to 30%",
            "Battery Life": "Up to 40 hours under max GPS tracking",
            "Lens": "Scratch-resistant Sapphire crystal"
        },
        features: [
            "Full offline topographic map pre-loaded",
            "Training Load analysis and Recovery advisor statistics",
            "Direct running wattage feedback computed at the wrist",
            "Advanced pacing suggestions matching elevation maps"
        ]
    },
    {
        id: 16,
        title: "Orbit Fitness Tracker Bracelet",
        category: "Wearables",
        price: 69.99,
        image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?auto=format&fit=crop&q=80&w=600",
        description: "Sleek, lightweight, and efficient. The Orbit band tracks steps, active calories, heart rate, and basic sleep patterns. It is the perfect daily health partner with a 21-day battery life.",
        rating: 4.3,
        reviewCount: 651,
        specs: {
            "Display": "1.1-inch curved responsive OLED touchscreen",
            "Weight": "22g (extremely light)",
            "Battery Life": "Up to 21 days on standard presets",
            "Colors": "Charcoal Black, Sandstone Rose, Mint Green",
            "Connectivity": "Bluetooth 5.0 LE"
        },
        features: [
            "Hourly nudge alerts urging active movement breaks",
            "Automated workout activation for walking and running",
            "Female cycle tracking logs",
            "Interchangeable premium silicone bands"
        ]
    },
    {
        id: 17,
        title: "Meridian Smart Audio Glasses",
        category: "Wearables",
        price: 189.99,
        image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=600",
        description: "Hear your environment while listening to podcasts or taking calls. The Meridian audio glasses house open-ear directional speakers tucked cleanly into a classic UV-blocking design.",
        rating: 4.6,
        reviewCount: 104,
        specs: {
            "Speakers": "Open-ear directional audio transducers",
            "Lenses": "Polarized, Blocks 99% UV-A and UV-B rays",
            "Control": "Temple swipe controls (volume, skip, voice prompt)",
            "Battery Life": "5 hours streaming audio",
            "Lenses Swap": "Prescription lens framework ready"
        },
        features: [
            "Discreet design looks like classic eyewear frames",
            "Reduces audio leak by 85% compared to open prototypes",
            "Integrated dual noise-cancelling mics for clear calls",
            "Compatible with device voice virtual assistants"
        ]
    },
    {
        id: 18,
        title: "Nerve VR Haptic Gloves",
        category: "Wearables",
        price: 399.99,
        image: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?auto=format&fit=crop&q=80&w=600",
        description: "Feel the virtual environment. Nerve Gloves deploy high-precision tracking sensors and micro-actuators that simulate force feedback, weight, texture, and touch in virtual environments.",
        rating: 4.8,
        reviewCount: 41,
        specs: {
            "Haptics": "16 independent LRA vibration nodes per hand",
            "Tracking": "Sub-millimeter IMU finger tracking sensors",
            "Latency": "Under 8 milliseconds tracking speed",
            "Fabric": "Flexible, stretchy spandex with adjustable straps",
            "SDK Setup": "SteamVR, Unity, Unreal Engine 5 compatible"
        },
        features: [
            "Simulates friction, resistance, and weight factors",
            "Calibrates automatically to user hand sizes",
            "Full index tracking without base station overlays",
            "Breathable fabric keeps palms dry during intense gaming"
        ]
    },

    // --- PERIPHERALS (6 items) ---
    {
        id: 19,
        title: "Prism Ultra HD 4K Webcam",
        category: "Peripherals",
        price: 129.99,
        image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&q=80&w=600",
        description: "Look your best in online call meetings. The Prism Webcam offers stunning 4K resolution at 30 fps, advanced HDR lighting correction, and dual noise-cancelling mics for superb streaming clarity.",
        rating: 4.7,
        reviewCount: 192,
        specs: {
            "Resolution": "4K UHD @ 30fps / 1080p @ 60fps",
            "Field of View": "Adjustable (65°, 78°, 90° FOV)",
            "Focus": "Fast intelligent autofocus tracking",
            "Connection": "USB-C plug & play (cable detached)",
            "Privacy": "Physical magnetic lens cover shutter"
        },
        features: [
            "AI tracking centers image on your face",
            "HDR backlight correction balances brightness",
            "Universal monitor mount clip with standard tripod screw thread",
            "Robust options settings console via app"
        ]
    },
    {
        id: 20,
        title: "Apex Core 7-in-1 USB-C Hub",
        category: "Peripherals",
        price: 59.99,
        image: "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?auto=format&fit=crop&q=80&w=600",
        description: "Expand your productivity footprint. Apex Core expands a single USB-C port into seven heavy connections, enabling displays, memory expansion, and power delivery in a sleek pocket-sized unit.",
        rating: 4.8,
        reviewCount: 304,
        specs: {
            "Ports": "1x HDMI 4K@60Hz, 1x USB-C PD (100W), 3x USB-A 3.0, SD and MicroSD Readers",
            "Chassis": "Space Grey anodized brushed metal",
            "Cable Length": "15cm reinforced nylon braided cable",
            "PD Passthrough": "Supports up to 85W laptop input charging"
        },
        features: [
            "Thermal protection casing prevents over-heating",
            "Plug & play setup, no device driver installation",
            "Simultaneous reading for SD and MicroSD memory slots",
            "Compact design fits easily inside laptop sleeves"
        ]
    },
    {
        id: 21,
        title: "Vortex Pro Vertical Ergonomic Mouse",
        category: "Peripherals",
        price: 69.99,
        image: "https://images.unsplash.com/photo-1527814050087-379381547969?auto=format&fit=crop&q=80&w=600",
        description: "Relieve muscle fatigue while working. The Vortex vertical mouse is sculpted to support your palm in a natural 57-degree handshake posture, reducing wrist pressure and forearm strain.",
        rating: 4.5,
        reviewCount: 175,
        specs: {
            "Angle": "57-degree hand alignment tilt",
            "Sensor": "8000 DPI adjustable optical sensor",
            "Connection": "Bluetooth, 2.4Ghz dongle, Wired",
            "Battery": "Rechargeable, lasts up to 4 months per charge",
            "Weight": "115g"
        },
        features: [
            "Reduces wrist strain by 10% based on user trials",
            "Ultra-silent smooth macro clicks",
            "Scroll wheel adapts to horizontal scrolls via thumb buttons",
            "Comfort-coated premium ribbed thumb rest"
        ]
    },
    {
        id: 22,
        title: "Lumina Studio Ring Light",
        category: "Peripherals",
        price: 49.99,
        image: "https://images.unsplash.com/photo-1619472338006-2586e3776767?auto=format&fit=crop&q=80&w=600",
        description: "Professional studio illumination. Lumina delivers soft, shadowless light for video calls, vlogs, and portrait photography. Featuring 3 color warmth presets and 10 dimming increments.",
        rating: 4.6,
        reviewCount: 229,
        specs: {
            "Diameter": "10-inch LED ring circle",
            "Colors Temp": "3200K (Warm) to 5800K (Cold)",
            "Stand Height": "Adjustable tripod (40cm to 160cm)",
            "Power Input": "USB 5V/2A powered",
            "LED bulbs": "120 high-efficiency SMD leads"
        },
        features: [
            "Rotatable spring-loaded cell phone holster",
            "Wireless remote control shutter for smartphones",
            "Heavy-duty metal ball head mounts",
            "Diffuses light prevents harsh glare or eye strain"
        ]
    },
    {
        id: 23,
        title: "Nova 140W Multi-Port GaN Charger",
        category: "Peripherals",
        price: 89.99,
        image: "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?auto=format&fit=crop&q=80&w=600",
        description: "Compact wall charger powered by Gallium Nitride (GaN) tech. Deliver a massive 140W divided across three USB-C and one USB-A ports, letting you charge your laptop, phone, and tablet simultaneously.",
        rating: 4.9,
        reviewCount: 162,
        specs: {
            "Max Power": "140W total output",
            "Ports Layout": "3x USB-C (PD 3.1), 1x USB-A (QC 4.0)",
            "Material": "V-0 fireproof polycarbonate, foldable wall prongs",
            "Dimensions": "75 x 75 x 30 mm",
            "Weight": "240g"
        },
        features: [
            "GaN Fast III smart technology keeps heat levels down",
            "Dynamic Power Allocation balances port draws",
            "Prongs fold inside to transport clean",
            "PD 3.1 support charges a Macbook Pro to 50% in 30 mins"
        ]
    },
    {
        id: 24,
        title: "Nimbus Air Purifying Desk Fan",
        category: "Peripherals",
        price: 119.99,
        image: "https://images.unsplash.com/photo-1618945089422-ece558509c21?auto=format&fit=crop&q=80&w=600",
        description: "Keep cool and breathe clean air. Double filtration fan removes 99% of dust particles, allergens, and pet dander from your desk workspace while blowing a targeted gentle breeze.",
        rating: 4.5,
        reviewCount: 88,
        specs: {
            "Filtration": "True HEPA H13 and Activated Carbon filter",
            "Speeds": "4 speed levels from breeze to gust",
            "Noise Level": "Super quiet 24dB on night settings",
            "Oscillation": "90-degree automatic sweep",
            "Filter Lifetime": "6-8 months usage tracker"
        },
        features: [
            "Dual filtration removes smoke, micro-dust, and odors",
            "Bladeless style safe for desks with children or pets",
            "Color-coded Air Quality indicator light ring",
            "Remote control magnetizes to top of the unit"
        ]
    }
];
