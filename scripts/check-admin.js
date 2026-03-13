/**
 * Test whether an email is allowed to sign in to the admin portal.
 * Usage: node scripts/check-admin.js <email>
 * Example: node scripts/check-admin.js noahsarknme@gmail.com
 */

const path = require('path');
const fs = require('fs');

const dataDir = path.join(__dirname, '..', 'src', 'data');
const adminsPath = path.join(dataDir, 'admins.json');
const superadminsPath = path.join(dataDir, 'superadmins.json');

function loadJson(filePath, defaultVal) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  } catch {
    return defaultVal;
  }
}

const admins = loadJson(adminsPath, { admins: [] }).admins || [];
const superadmins = loadJson(superadminsPath, { superadmins: [] }).superadmins || [];

const email = process.argv[2];
if (!email) {
  console.log('Usage: node scripts/check-admin.js <email>');
  console.log('\nCurrently allowed:');
  console.log('  Superadmins:', superadmins.length ? superadmins.join(', ') : '(none)');
  console.log('  Admins:     ', admins.length ? admins.join(', ') : '(none)');
  process.exit(1);
}

const normalized = email.trim().toLowerCase();
const isSuper = superadmins.some((e) => e.toLowerCase() === normalized);
const isAdmin = admins.some((e) => e.toLowerCase() === normalized);
const allowed = isSuper || isAdmin;

if (allowed) {
  console.log('YES –', email, 'can sign in to Admin.', isSuper ? '(Superadmin)' : '(Admin)');
} else {
  console.log('NO –', email, 'cannot sign in. Add to src/data/superadmins.json or src/data/admins.json.');
}
process.exit(allowed ? 0 : 1);
