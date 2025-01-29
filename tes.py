import itertools
import string
import aiohttp
import asyncio

async def check_url(session, suffix):
    base_url = "https://bit.ly/FISIKA_XE_"
    url = base_url + suffix
    try:
        async with session.get(url) as response:
            if response.status == 200:
                return url
    except aiohttp.ClientError:
        return None

async def brute_force_async(length):
    characters = string.ascii_letters + string.digits
    combinations = (''.join(combination) for combination in itertools.product(characters, repeat=length))
    
    async with aiohttp.ClientSession() as session:
        tasks = [check_url(session, combination) for combination in combinations]
        for task in asyncio.as_completed(tasks):
            result = await task
            if result:
                return result
    return None

# Tentukan panjang suffix
suffix_length = 5

# Brute-force
result = asyncio.run(brute_force_async(suffix_length))
if result:
    print(f"URL valid ditemukan: {result}")
else:
    print("Tidak ada suffix yang valid ditemukan.")
