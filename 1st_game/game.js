(() => {
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');
  const scoreEl = document.getElementById('score');
  const hpBarEl = document.getElementById('hpBar');
  const livesWrapEl = document.getElementById('livesWrap');
  const gameOverOverlay = document.getElementById('gameOverOverlay');
  const finalScoreEl = document.getElementById('finalScore');
  const restartBtn = document.getElementById('restartBtn');

  const WIDTH = canvas.width;
  const HEIGHT = canvas.height;

  const MAX_HP = 100;
  const MAX_LIVES = 3;

  let score = 0;
  let hp = MAX_HP;
  let lives = MAX_LIVES;
  let gameOver = false;

  const player = {
    x: WIDTH / 2,
    y: HEIGHT - 60,
    w: 40,
    h: 40,
    speed: 6
  };

  const enemy = {
    x: WIDTH / 2,
    y: 80,
    w: 40,
    h: 40,
    dir: 1,
    speed: 4,
    shootCooldown: 0
  };

  const bullets = [];
  const enemyBullets = [];

  const keys = {};
  const mouse = { x: WIDTH / 2, y: HEIGHT / 2 };
  let lastShootTime = 0;

  function updateLivesDisplay() {
    livesWrapEl.innerHTML = '';
    for (let i = 0; i < MAX_LIVES; i++) {
      const dot = document.createElement('div');
      dot.className = 'life-icon' + (i >= lives ? ' lost' : '');
      livesWrapEl.appendChild(dot);
    }
  }

  function setHP(val) {
    hp = Math.max(0, Math.min(MAX_HP, val));
    hpBarEl.style.width = (hp / MAX_HP) * 100 + '%';
  }

  function addScore(val) {
    score += val;
    scoreEl.textContent = String(score);
  }

  function resetGame() {
    score = 0;
    hp = MAX_HP;
    lives = MAX_LIVES;
    gameOver = false;
    bullets.length = 0;
    enemyBullets.length = 0;
    player.x = WIDTH / 2;
    enemy.x = WIDTH / 2;
    enemy.dir = 1;
    enemy.shootCooldown = 1;
    scoreEl.textContent = '0';
    setHP(MAX_HP);
    updateLivesDisplay();
    gameOverOverlay.classList.remove('visible');
  }

  function takeHit(amount) {
    if (gameOver) return;
    setHP(hp - amount);
    if (hp <= 0) {
      lives -= 1;
      updateLivesDisplay();
      if (lives <= 0) {
        gameOver = true;
        finalScoreEl.textContent = String(score);
        gameOverOverlay.classList.add('visible');
      } else {
        setHP(MAX_HP);
      }
    }
  }

  document.addEventListener('keydown', (e) => {
    keys[e.code] = true;
  });

  document.addEventListener('keyup', (e) => {
    keys[e.code] = false;
  });

  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = WIDTH / rect.width;
    const scaleY = HEIGHT / rect.height;
    mouse.x = (e.clientX - rect.left) * scaleX;
    mouse.y = (e.clientY - rect.top) * scaleY;
  });

  canvas.addEventListener('click', () => {
    if (gameOver) return;
    const now = performance.now() / 1000;
    if (now - lastShootTime < 0.2) return;
    lastShootTime = now;

    const dx = mouse.x - (player.x + player.w / 2);
    const dy = mouse.y - (player.y + player.h / 2);
    const len = Math.hypot(dx, dy) || 1;
    bullets.push({
      x: player.x + player.w / 2,
      y: player.y + player.h / 2,
      vx: (dx / len) * 10,
      vy: (dy / len) * 10,
      r: 4
    });
  });

  restartBtn.addEventListener('click', resetGame);

  function rectHit(ax, ay, aw, ah, bx, by, bw, bh) {
    return ax < bx + bw && ax + aw > bx && ay < by + bh && ay + ah > by;
  }

  function circleRectHit(cx, cy, cr, rx, ry, rw, rh) {
    const closestX = Math.max(rx, Math.min(cx, rx + rw));
    const closestY = Math.max(ry, Math.min(cy, ry + rh));
    const dx = cx - closestX;
    const dy = cy - closestY;
    return dx * dx + dy * dy <= cr * cr;
  }

  function update(dt) {
    if (gameOver) return;

    if (keys['KeyA'] || keys['ArrowLeft']) {
      player.x -= player.speed;
    }
    if (keys['KeyD'] || keys['ArrowRight']) {
      player.x += player.speed;
    }
    player.x = Math.max(40, Math.min(WIDTH - 80, player.x));

    enemy.x += enemy.dir * enemy.speed;
    if (enemy.x < 40 || enemy.x + enemy.w > WIDTH - 40) {
      enemy.dir *= -1;
    }

    enemy.shootCooldown -= dt;
    if (enemy.shootCooldown <= 0) {
      enemy.shootCooldown = 1.2 + Math.random() * 0.6;
      const dx = player.x + player.w / 2 - (enemy.x + enemy.w / 2);
      const dy = player.y + player.h / 2 - (enemy.y + enemy.h / 2);
      const len = Math.hypot(dx, dy) || 1;
      enemyBullets.push({
        x: enemy.x + enemy.w / 2,
        y: enemy.y + enemy.h / 2,
        vx: (dx / len) * 7,
        vy: (dy / len) * 7,
        r: 4
      });
    }

    for (let i = bullets.length - 1; i >= 0; i--) {
      const b = bullets[i];
      b.x += b.vx;
      b.y += b.vy;
      if (
        b.x < -20 ||
        b.x > WIDTH + 20 ||
        b.y < -20 ||
        b.y > HEIGHT + 20
      ) {
        bullets.splice(i, 1);
        continue;
      }
      if (
        circleRectHit(b.x, b.y, b.r, enemy.x, enemy.y, enemy.w, enemy.h)
      ) {
        bullets.splice(i, 1);
        addScore(1);
        enemy.x = 100 + Math.random() * (WIDTH - 200);
        enemy.y = 70 + Math.random() * 60;
        enemy.dir = Math.random() < 0.5 ? -1 : 1;
      }
    }

    for (let i = enemyBullets.length - 1; i >= 0; i--) {
      const b = enemyBullets[i];
      b.x += b.vx;
      b.y += b.vy;
      if (
        b.x < -30 ||
        b.x > WIDTH + 30 ||
        b.y < -30 ||
        b.y > HEIGHT + 30
      ) {
        enemyBullets.splice(i, 1);
        continue;
      }
      if (
        circleRectHit(b.x, b.y, b.r, player.x, player.y, player.w, player.h)
      ) {
        enemyBullets.splice(i, 1);
        takeHit(40);
      }
    }
  }

  function draw() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    ctx.fillStyle = '#020617';
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
    ctx.strokeStyle = '#1f2937';
    ctx.lineWidth = 1;
    for (let y = 60; y < HEIGHT; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(WIDTH, y);
      ctx.stroke();
    }

    ctx.fillStyle = '#38bdf8';
    ctx.beginPath();
    ctx.arc(
      player.x + player.w / 2,
      player.y + player.h / 2,
      18,
      0,
      Math.PI * 2
    );
    ctx.fill();
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(player.x + 6, player.y + 10, player.w - 12, player.h - 18);

    ctx.fillStyle = '#f97373';
    ctx.beginPath();
    ctx.arc(enemy.x + enemy.w / 2, enemy.y + enemy.h / 2, 18, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#7f1d1d';
    ctx.fillRect(enemy.x + 6, enemy.y + 10, enemy.w - 12, enemy.h - 18);

    ctx.save();
    ctx.translate(mouse.x, mouse.y);
    ctx.strokeStyle = 'rgba(252, 211, 77, 0.9)';
    ctx.lineWidth = 1;
    const r = 10;
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(-r - 4, 0);
    ctx.lineTo(-2, 0);
    ctx.moveTo(r + 4, 0);
    ctx.lineTo(2, 0);
    ctx.moveTo(0, -r - 4);
    ctx.lineTo(0, -2);
    ctx.moveTo(0, r + 4);
    ctx.lineTo(0, 2);
    ctx.stroke();
    ctx.restore();

    ctx.fillStyle = '#fde047';
    bullets.forEach((b) => {
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.fillStyle = '#fb7185';
    enemyBullets.forEach((b) => {
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  let lastTime = performance.now() / 1000;
  function loop() {
    const now = performance.now() / 1000;
    const dt = Math.min(now - lastTime, 0.05);
    lastTime = now;
    update(dt);
    draw();
    requestAnimationFrame(loop);
  }

  updateLivesDisplay();
  setHP(MAX_HP);
  loop();
})();

(() => {
  const container = document.getElementById('threeContainer');
  const scoreEl = document.getElementById('score');
  const hpBarEl = document.getElementById('hpBar');
  const livesWrapEl = document.getElementById('livesWrap');
  const gameOverOverlay = document.getElementById('gameOverOverlay');
  const finalScoreEl = document.getElementById('finalScore');
  const restartBtn = document.getElementById('restartBtn');

  if (!container || !THREE) {
    console.error('Three.js or container not found');
    return;
  }

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio || 1);
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x020617);

  const camera = new THREE.PerspectiveCamera(
    65,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );

  const hemi = new THREE.HemisphereLight(0x88c0ff, 0x111111, 0.7);
  scene.add(hemi);
  const dir = new THREE.DirectionalLight(0xffffff, 0.8);
  dir.position.set(5, 10, 3);
  scene.add(dir);

  const floorGeo = new THREE.PlaneGeometry(80, 80);
  const floorMat = new THREE.MeshStandardMaterial({
    color: 0x0b1120,
    metalness: 0.1,
    roughness: 0.9
  });
  const floor = new THREE.Mesh(floorGeo, floorMat);
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  scene.add(floor);

  const grid = new THREE.GridHelper(80, 40, 0x22c1c3, 0x22c1c3);
  grid.position.y = 0.01;
  grid.material.opacity = 0.35;
  grid.material.transparent = true;
  scene.add(grid);

  // —— Build humanoid (player or bot): head, torso, legs, arms; bot has gun ——
  function createHumanoid(isEnemy) {
    const group = new THREE.Group();
    const skin = new THREE.MeshStandardMaterial({
      color: isEnemy ? 0x8b4513 : 0xdeb887,
      roughness: 0.85,
      metalness: 0.05
    });
    const clothes = new THREE.MeshStandardMaterial({
      color: isEnemy ? 0x2d5016 : 0x4a7c9e,
      roughness: 0.8,
      metalness: 0.1
    });
    const dark = new THREE.MeshStandardMaterial({
      color: isEnemy ? 0x1a2e0f : 0x2a4a5a,
      roughness: 0.9
    });

    const headGeo = new THREE.SphereGeometry(0.35, 12, 10);
    const head = new THREE.Mesh(headGeo, skin);
    head.position.y = 1.5;
    group.add(head);

    const torsoGeo = new THREE.BoxGeometry(0.5, 0.6, 0.25);
    const torso = new THREE.Mesh(torsoGeo, clothes);
    torso.position.y = 0.95;
    group.add(torso);

    const legGeo = new THREE.BoxGeometry(0.15, 0.5, 0.15);
    const legL = new THREE.Mesh(legGeo, dark);
    legL.position.set(-0.12, 0.25, 0);
    group.add(legL);
    const legR = new THREE.Mesh(legGeo, dark);
    legR.position.set(0.12, 0.25, 0);
    group.add(legR);

    const armGeo = new THREE.BoxGeometry(0.12, 0.4, 0.12);
    const armL = new THREE.Mesh(armGeo, skin);
    armL.position.set(-0.35, 1.0, 0);
    group.add(armL);
    const armR = new THREE.Mesh(armGeo, skin);
    armR.position.set(0.35, 1.0, 0);
    group.add(armR);

    if (isEnemy) {
      const gunGeo = new THREE.BoxGeometry(0.4, 0.08, 0.08);
      const gunMat = new THREE.MeshStandardMaterial({ color: 0x1a1a1a });
      const gun = new THREE.Mesh(gunGeo, gunMat);
      gun.position.set(0.5, 1.0, 0);
      armR.add(gun);
    }

    group.userData.isHumanoid = true;
    group.userData.isEnemy = isEnemy;
    group.castShadow = true;
    return group;
  }

  // Hitbox for raycast (invisible box around humanoid)
  function addHitbox(group, size) {
    const geo = new THREE.BoxGeometry(size.x, size.y, size.z);
    const mat = new THREE.MeshBasicMaterial({ visible: false });
    const hitbox = new THREE.Mesh(geo, mat);
    hitbox.position.y = size.y / 2;
    group.add(hitbox);
    group.userData.hitbox = hitbox;
    return hitbox;
  }

  const MAX_HP = 100;
  const MAX_LIVES = 3;
  let hp = MAX_HP;
  let lives = MAX_LIVES;
  let score = 0;
  let gameOver = false;
  let invincibleUntil = 0;

  function updateLivesDisplay() {
    livesWrapEl.innerHTML = '';
    for (let i = 0; i < MAX_LIVES; i++) {
      const el = document.createElement('div');
      el.className = 'life-icon' + (i >= lives ? ' lost' : '');
      livesWrapEl.appendChild(el);
    }
  }

  function setHP(value) {
    hp = Math.max(0, Math.min(MAX_HP, value));
    hpBarEl.style.width = (hp / MAX_HP) * 100 + '%';
  }

  function addScore(amount) {
    score += amount;
    scoreEl.textContent = String(score);
  }

  function takeDamage(amount) {
    if (gameOver || Date.now() < invincibleUntil) return;
    setHP(hp - amount);
    if (hp <= 0) {
      lives -= 1;
      updateLivesDisplay();
      if (lives <= 0) {
        gameOver = true;
        finalScoreEl.textContent = String(score);
        gameOverOverlay.classList.add('visible');
      } else {
        setHP(MAX_HP);
        invincibleUntil = Date.now() + 2000;
        if (playerGroup) {
          playerGroup.position.set(0, 0, 10);
          playerYaw = 0;
          cameraPitch = 0;
        }
      }
    }
  }

  const keys = {};
  document.addEventListener('keydown', (e) => { keys[e.code] = true; });
  document.addEventListener('keyup', (e) => { keys[e.code] = false; });

  container.addEventListener('mousedown', () => container.requestPointerLock?.());
  let yaw = 0;
  let cameraPitch = 0;
  let playerYaw = 0;

  document.addEventListener('mousemove', (e) => {
    if (document.pointerLockElement !== container) return;
    const sens = 0.0022;
    yaw -= e.movementX * sens;
    cameraPitch -= e.movementY * sens;
    cameraPitch = Math.max(-0.8, Math.min(0.4, cameraPitch));
    playerYaw -= e.movementX * sens;
  });

  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2(0, 0);
  const shootCooldown = 0.25;
  let lastShotTime = 0;

  let playerGroup = null;
  const BOT_WALK_SPEED = 3.5;
  const BOT_STOP_AND_SHOOT_RANGE = 18;
  const BOT_SHOOT_COOLDOWN = 1.6;
  const BOT_WAYPOINT_RADIUS = 1.2;
  const BOT_PAUSE_AT_WAYPOINT = 0.8;

  const levels = [
    {
      walls: [
        { x: 0, z: -25, w: 40, h: 4 },
        { x: -18, z: -10, w: 4, h: 16 },
        { x: 18, z: -10, w: 4, h: 16 }
      ],
      bots: [
        { waypoints: [{ x: -10, z: -10 }, { x: -10, z: -22 }, { x: 0, z: -22 }, { x: 0, z: -10 }] },
        { waypoints: [{ x: 10, z: -12 }, { x: 10, z: -20 }, { x: 2, z: -20 }, { x: 2, z: -12 }] },
        { waypoints: [{ x: 0, z: -18 }, { x: -8, z: -18 }, { x: -8, z: -14 }, { x: 0, z: -14 }] }
      ]
    },
    {
      walls: [
        { x: 0, z: -15, w: 30, h: 2 },
        { x: -20, z: -20, w: 2, h: 20 },
        { x: 20, z: -20, w: 2, h: 20 }
      ],
      bots: [
        { waypoints: [{ x: -15, z: -8 }, { x: -15, z: -25 }, { x: 0, z: -25 }, { x: 0, z: -8 }] },
        { waypoints: [{ x: 15, z: -8 }, { x: 15, z: -25 }, { x: 5, z: -25 }, { x: 5, z: -8 }] },
        { waypoints: [{ x: 0, z: -18 }, { x: -10, z: -18 }, { x: -10, z: -12 }, { x: 0, z: -12 }] },
        { waypoints: [{ x: 0, z: -28 }, { x: 8, z: -28 }, { x: 8, z: -22 }, { x: 0, z: -22 }] }
      ]
    },
    {
      walls: [
        { x: 0, z: -12, w: 36, h: 2 },
        { x: 0, z: -24, w: 26, h: 2 },
        { x: -20, z: -20, w: 2, h: 20 },
        { x: 20, z: -20, w: 2, h: 20 }
      ],
      bots: [
        { waypoints: [{ x: -18, z: -10 }, { x: -18, z: -28 }, { x: -5, z: -28 }, { x: -5, z: -10 }] },
        { waypoints: [{ x: 18, z: -10 }, { x: 18, z: -28 }, { x: 5, z: -28 }, { x: 5, z: -10 }] },
        { waypoints: [{ x: -6, z: -22 }, { x: -6, z: -16 }, { x: 6, z: -16 }, { x: 6, z: -22 }] },
        { waypoints: [{ x: 0, z: -30 }, { x: 10, z: -30 }, { x: 10, z: -26 }, { x: 0, z: -26 }] },
        { waypoints: [{ x: 0, z: -18 }, { x: -12, z: -18 }, { x: -12, z: -14 }, { x: 0, z: -14 }] }
      ]
    }
  ];

  let currentLevelIndex = 0;
  const wallMeshes = [];
  const enemies = [];
  const enemyHitboxes = [];

  function clearLevel() {
    if (playerGroup) {
      scene.remove(playerGroup);
      playerGroup = null;
    }
    enemies.forEach((e) => {
      scene.remove(e.group);
    });
    wallMeshes.forEach((m) => scene.remove(m));
    enemies.length = 0;
    enemyHitboxes.length = 0;
    wallMeshes.length = 0;
  }

  function buildLevel(index) {
    clearLevel();
    const level = levels[index % levels.length];

    const wallMat = new THREE.MeshStandardMaterial({
      color: 0x1f2937,
      metalness: 0.3,
      roughness: 0.7
    });
    level.walls.forEach((w) => {
      const geo = new THREE.BoxGeometry(w.w, 4, w.h);
      const mesh = new THREE.Mesh(geo, wallMat);
      mesh.position.set(w.x, 2, w.z);
      mesh.receiveShadow = true;
      scene.add(mesh);
      wallMeshes.push(mesh);
    });

    playerGroup = createHumanoid(false);
    addHitbox(playerGroup, new THREE.Vector3(0.6, 1.6, 0.4));
    playerGroup.position.set(0, 0, 10);
    scene.add(playerGroup);

    camera.position.set(0, 2.5, 4);
    camera.lookAt(0, 1.2, 0);
    camera.setParent(playerGroup);
    camera.position.set(0, 2.2, 4.5);
    camera.rotation.x = 0;

    level.bots.forEach((botDef) => {
      const wp = botDef.waypoints;
      const start = wp[0];
      const group = createHumanoid(true);
      addHitbox(group, new THREE.Vector3(0.6, 1.6, 0.4));
      group.position.set(start.x, 0, start.z);
      scene.add(group);
      const hitbox = group.userData.hitbox;
      enemyHitboxes.push(hitbox);
      enemies.push({
        group,
        waypoints: wp,
        waypointIndex: 0,
        pauseTimer: 0,
        shootTimer: BOT_SHOOT_COOLDOWN * 0.5 + Math.random() * 0.5
      });
    });
  }

  function nextLevel() {
    currentLevelIndex = (currentLevelIndex + 1) % levels.length;
    buildLevel(currentLevelIndex);
  }

  const enemyBullets = [];
  const enemyBulletGeo = new THREE.SphereGeometry(0.2, 8, 8);
  const enemyBulletMat = new THREE.MeshBasicMaterial({
    color: 0xff4757
  });

  function spawnEnemyBullet(from, dir) {
    const mesh = new THREE.Mesh(enemyBulletGeo, enemyBulletMat);
    mesh.position.copy(from);
    mesh.position.y = 1.2;
    scene.add(mesh);
    enemyBullets.push({
      mesh,
      dir: dir.clone().normalize(),
      life: 2.5
    });
  }

  container.addEventListener('click', () => {
    if (gameOver) return;
    const now = performance.now() / 1000;
    if (now - lastShotTime < shootCooldown) return;
    lastShotTime = now;

    raycaster.setFromCamera(mouse, camera);
    const hits = raycaster.intersectObjects(enemyHitboxes, true);
    if (hits.length > 0) {
      const hit = hits[0].object;
      const group = hit.parent;
      const idx = enemies.findIndex((e) => e.group === group);
      if (idx !== -1) {
        scene.remove(enemies[idx].group);
        enemyHitboxes.splice(idx, 1);
        enemies.splice(idx, 1);
        addScore(1);
        if (enemies.length === 0) nextLevel();
      }
    }
  });

  const clock = new THREE.Clock();

  function resetGame() {
    gameOver = false;
    score = 0;
    scoreEl.textContent = '0';
    setHP(MAX_HP);
    lives = MAX_LIVES;
    updateLivesDisplay();
    invincibleUntil = 0;
    currentLevelIndex = 0;
    enemyBullets.forEach((b) => scene.remove(b.mesh));
    enemyBullets.length = 0;
    buildLevel(currentLevelIndex);
    gameOverOverlay.classList.remove('visible');
  }

  restartBtn.addEventListener('click', resetGame);

  function update(dt) {
    if (gameOver) return;

    const playerPos = playerGroup ? playerGroup.position : new THREE.Vector3(0, 0, 10);
    camera.rotation.order = 'YXZ';
    camera.rotation.x = cameraPitch;

    if (playerGroup) {
      const moveSpeed = 14;
      const forward = new THREE.Vector3(0, 0, -1).applyAxisAngle(new THREE.Vector3(0, 1, 0), playerYaw);
      const right = new THREE.Vector3(1, 0, 0).applyAxisAngle(new THREE.Vector3(0, 1, 0), playerYaw);
      const vel = new THREE.Vector3();
      if (keys['KeyW']) vel.add(forward);
      if (keys['KeyS']) vel.sub(forward);
      if (keys['KeyA']) vel.sub(right);
      if (keys['KeyD']) vel.add(right);
      if (vel.lengthSq() > 0) {
        vel.normalize().multiplyScalar(moveSpeed * dt);
        playerGroup.position.add(vel);
      }
      if (playerGroup) playerGroup.rotation.y = playerYaw;
    }

    enemies.forEach((e) => {
      const pos = e.group.position;
      const wp = e.waypoints[e.waypointIndex];
      const tx = wp.x;
      const tz = wp.z;
      const dx = tx - pos.x;
      const dz = tz - pos.z;
      const dist = Math.sqrt(dx * dx + dz * dz);

      const playerDist = pos.distanceTo(playerPos);
      const inRange = playerDist < BOT_STOP_AND_SHOOT_RANGE;

      if (inRange) {
        e.shootTimer -= dt;
        if (e.shootTimer <= 0) {
          e.shootTimer = BOT_SHOOT_COOLDOWN;
          const dir = new THREE.Vector3(
            playerPos.x - pos.x,
            0,
            playerPos.z - pos.z
          ).normalize();
          spawnEnemyBullet(pos.clone(), dir);
        }
        e.group.lookAt(playerPos.x, pos.y, playerPos.z);
      } else {
        if (e.pauseTimer > 0) {
          e.pauseTimer -= dt;
          return;
        }
        if (dist < BOT_WAYPOINT_RADIUS) {
          e.waypointIndex = (e.waypointIndex + 1) % e.waypoints.length;
          e.pauseTimer = BOT_PAUSE_AT_WAYPOINT;
          return;
        }
        const vx = (dx / dist) * BOT_WALK_SPEED * dt;
        const vz = (dz / dist) * BOT_WALK_SPEED * dt;
        e.group.position.x += vx;
        e.group.position.z += vz;
        e.group.rotation.y = Math.atan2(-dx, -dz);
      }
    });

    for (let i = enemyBullets.length - 1; i >= 0; i--) {
      const b = enemyBullets[i];
      b.mesh.position.addScaledVector(b.dir, dt * 22);
      b.life -= dt;
      if (b.life <= 0) {
        scene.remove(b.mesh);
        enemyBullets.splice(i, 1);
        continue;
      }
      const d = b.mesh.position.distanceTo(playerPos);
      if (d < 1.5) {
        takeDamage(18);
        scene.remove(b.mesh);
        enemyBullets.splice(i, 1);
      }
    }
  }

  function animate() {
    const dt = Math.min(clock.getDelta(), 0.1);
    update(dt);
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }

  window.addEventListener('resize', () => {
    const w = container.clientWidth || 960;
    const h = container.clientHeight || 540;
    renderer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  });

  updateLivesDisplay();
  setHP(MAX_HP);
  buildLevel(currentLevelIndex);
  animate();
})();
